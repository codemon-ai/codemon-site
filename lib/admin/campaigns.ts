import { createAdminClient } from '../supabase'
import type { EmailCampaign, EmailLog } from './types'

interface CreateCampaignInput {
  type: EmailCampaign['type']
  subject: string
  body_html: string
  recipient_filter?: Record<string, unknown>
  total_recipients: number
}

export async function createCampaign(input: CreateCampaignInput): Promise<EmailCampaign> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('email_campaigns')
    .insert({
      type: input.type,
      subject: input.subject,
      body_html: input.body_html,
      recipient_filter: input.recipient_filter ?? {},
      total_recipients: input.total_recipients,
      status: 'sending',
    })
    .select()
    .single()

  if (error) throw error
  return data as EmailCampaign
}

export async function updateCampaignStatus(
  id: string,
  status: EmailCampaign['status'],
  counts?: { sent_count?: number; failed_count?: number }
) {
  const supabase = createAdminClient()
  const { error } = await supabase
    .from('email_campaigns')
    .update({
      status,
      ...(counts ?? {}),
      ...(status === 'sent' ? { sent_at: new Date().toISOString() } : {}),
    })
    .eq('id', id)

  if (error) throw error
}

export async function listCampaigns(page = 1, limit = 20) {
  const supabase = createAdminClient()
  const from = (page - 1) * limit
  const to = from + limit - 1

  const { data, count, error } = await supabase
    .from('email_campaigns')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to)

  if (error) throw error
  return { campaigns: (data ?? []) as EmailCampaign[], total: count ?? 0 }
}

export async function countCampaigns(): Promise<number> {
  const supabase = createAdminClient()
  const { count, error } = await supabase
    .from('email_campaigns')
    .select('*', { count: 'exact', head: true })

  if (error) throw error
  return count ?? 0
}

export async function addEmailLog(log: Omit<EmailLog, 'id' | 'sent_at'>) {
  const supabase = createAdminClient()
  const { error } = await supabase.from('email_logs').insert({
    campaign_id: log.campaign_id,
    email: log.email,
    status: log.status,
    resend_id: log.resend_id,
    error: log.error,
    sent_at: log.status === 'sent' ? new Date().toISOString() : null,
  })
  if (error) throw error
}
