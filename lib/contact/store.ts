import { createAdminClient } from '../supabase'

export type InquiryType = 'project' | 'lecture'
export interface InquiryInput {
  type: InquiryType
  org?: string
  name: string
  contact: string
  body: string
  meta?: Record<string, string>
}

/** Supabase `inquiries` (DDL: docs/prd/site-renewal-2026.md §4.5) */
export async function saveInquiry(input: InquiryInput): Promise<string> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('inquiries')
    .insert({ type: input.type, org: input.org ?? null, name: input.name, contact: input.contact, body: input.body, meta: input.meta ?? {} })
    .select('id')
    .single()
  if (error) throw error
  return data.id as string
}
