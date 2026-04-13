import { createAdminClient } from '../supabase'
import type { SurveyResponse } from './types'

interface ListOptions {
  lectureId?: string
  rating?: number
  page?: number
  limit?: number
}

export async function listSurveys(opts: ListOptions = {}) {
  const { lectureId, rating, page = 1, limit = 50 } = opts
  const supabase = createAdminClient()
  const from = (page - 1) * limit
  const to = from + limit - 1

  let query = supabase
    .from('survey_responses')
    .select('*', { count: 'exact' })
    .order('submitted_at', { ascending: false })
    .range(from, to)

  if (lectureId) {
    query = query.eq('lecture_id', lectureId)
  }
  if (rating) {
    query = query.eq('rating', rating)
  }

  const { data, count, error } = await query
  if (error) throw error
  return { surveys: (data ?? []) as SurveyResponse[], total: count ?? 0 }
}

export async function countSurveys(): Promise<number> {
  const supabase = createAdminClient()
  const { count, error } = await supabase
    .from('survey_responses')
    .select('*', { count: 'exact', head: true })

  if (error) throw error
  return count ?? 0
}

export async function exportSurveysCSV(lectureId?: string): Promise<string> {
  const supabase = createAdminClient()
  let query = supabase
    .from('survey_responses')
    .select('lecture_id, company_name, contact_name, title, email, phone, rating, gains, questions, submitted_at')
    .order('submitted_at', { ascending: false })

  if (lectureId) {
    query = query.eq('lecture_id', lectureId)
  }

  const { data, error } = await query
  if (error) throw error

  const rows = (data ?? []) as SurveyResponse[]
  const header = 'lecture_id,company_name,contact_name,title,email,phone,rating,gains,questions,submitted_at'
  const escape = (v: string) => `"${String(v).replace(/"/g, '""')}"`
  const csv = rows
    .map((r) =>
      [r.lecture_id, r.company_name, r.contact_name, r.title, r.email, r.phone, r.rating, escape(r.gains), escape(r.questions), r.submitted_at].join(',')
    )
    .join('\n')
  return `${header}\n${csv}`
}
