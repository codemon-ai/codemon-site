/**
 * One-time migration: Vercel Blob → Supabase
 *
 * Usage:
 *   npx tsx scripts/migrate-blob-to-supabase.ts
 *
 * Requires env vars: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, BLOB_READ_WRITE_TOKEN
 */

import { list } from '@vercel/blob'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function migrateNewsletter() {
  console.log('\n📧 Migrating newsletter subscribers...')

  const { blobs } = await list({ prefix: 'newsletter/subscribers.json' })
  if (blobs.length === 0) {
    console.log('  No newsletter data found in Blob.')
    return
  }

  const url = new URL(blobs[0].url)
  url.searchParams.set('t', String(Date.now()))
  const res = await fetch(url.toString(), { cache: 'no-store' })
  const data = await res.json()

  const subscribers = data.subscribers ?? []
  console.log(`  Found ${subscribers.length} subscribers in Blob.`)

  let inserted = 0
  let skipped = 0

  for (const sub of subscribers) {
    const { error } = await supabase
      .from('subscribers')
      .upsert(
        {
          email: sub.email,
          source: sub.source ?? 'partner-page',
          subscribed_at: new Date(sub.subscribedAt).toISOString(),
        },
        { onConflict: 'email', ignoreDuplicates: true }
      )

    if (error) {
      console.log(`  ⚠ Skipped ${sub.email}: ${error.message}`)
      skipped++
    } else {
      inserted++
    }
  }

  console.log(`  ✅ Inserted: ${inserted}, Skipped: ${skipped}`)
}

async function migrateSurveys() {
  console.log('\n📋 Migrating survey responses...')

  const lectureIds = ['lecture-agency-ai', 'lecture-startup-ai', 'lecture-podl-ai']
  let totalInserted = 0
  let totalSkipped = 0

  for (const lectureId of lectureIds) {
    const prefix = `survey/responses/${lectureId}/`
    const { blobs } = await list({ prefix })
    console.log(`  ${lectureId}: ${blobs.length} responses found`)

    for (const blob of blobs) {
      try {
        const url = new URL(blob.url)
        url.searchParams.set('t', String(Date.now()))
        const res = await fetch(url.toString(), { cache: 'no-store' })
        const survey = await res.json()

        const { error } = await supabase.from('survey_responses').insert({
          lecture_id: survey.lectureId,
          company_name: survey.companyName,
          contact_name: survey.contactName,
          title: survey.title,
          email: survey.email,
          phone: survey.phone,
          rating: survey.rating,
          gains: survey.gains ?? '',
          questions: survey.questions ?? '',
          privacy_consent: survey.privacyConsent ?? true,
          submitted_at: new Date(survey.submittedAt).toISOString(),
        })

        if (error) {
          console.log(`  ⚠ Skipped ${blob.pathname}: ${error.message}`)
          totalSkipped++
        } else {
          totalInserted++
        }
      } catch (err) {
        console.log(`  ⚠ Error processing ${blob.pathname}: ${err}`)
        totalSkipped++
      }
    }
  }

  console.log(`  ✅ Inserted: ${totalInserted}, Skipped: ${totalSkipped}`)
}

async function main() {
  console.log('🚀 Starting Vercel Blob → Supabase migration...')
  await migrateNewsletter()
  await migrateSurveys()
  console.log('\n🎉 Migration complete!')
}

main().catch(console.error)
