import { put } from '@vercel/blob'
import crypto from 'crypto'
import { createClient } from './supabase'

export interface SurveyResponse {
  id: string
  lectureId: string
  companyName: string
  contactName: string
  title: string
  email: string
  phone: string
  rating: number
  gains: string
  questions: string
  privacyConsent: boolean
  submittedAt: number
}

export function isValidLectureId(id: string): boolean {
  return /^lecture-[a-z0-9-]+$/.test(id)
}

async function saveSurveyToSupabase(data: SurveyResponse): Promise<boolean> {
  try {
    const supabase = createClient()
    const { error } = await supabase.from('survey_responses').insert({
      lecture_id: data.lectureId,
      company_name: data.companyName,
      contact_name: data.contactName,
      title: data.title,
      email: data.email,
      phone: data.phone,
      rating: data.rating,
      gains: data.gains,
      questions: data.questions,
      privacy_consent: data.privacyConsent,
    })
    return !error
  } catch {
    return false
  }
}

export async function saveSurveyResponse(
  data: Omit<SurveyResponse, 'id' | 'submittedAt'>
): Promise<SurveyResponse> {
  const id = crypto.randomBytes(8).toString('hex')
  const response: SurveyResponse = {
    ...data,
    id,
    submittedAt: Date.now(),
  }

  // Dual write: Supabase (fire and forget on failure)
  await saveSurveyToSupabase(response)

  await put(
    `survey/responses/${data.lectureId}/${id}.json`,
    JSON.stringify(response),
    {
      access: 'public',
      contentType: 'application/json',
      addRandomSuffix: false,
      allowOverwrite: true,
    }
  )

  return response
}
