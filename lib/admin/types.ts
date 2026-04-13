export interface Subscriber {
  id: string
  email: string
  source: string
  subscribed_at: string
  unsubscribed_at: string | null
  created_at: string
}

export interface SurveyResponse {
  id: string
  lecture_id: string
  company_name: string
  contact_name: string
  title: string
  email: string
  phone: string
  rating: number
  gains: string
  questions: string
  privacy_consent: boolean
  submitted_at: string
}

export interface EmailCampaign {
  id: string
  type: 'lecture_update' | 'newsletter' | 'manual'
  subject: string
  body_html: string
  recipient_filter: Record<string, unknown>
  total_recipients: number
  sent_count: number
  failed_count: number
  status: 'draft' | 'sending' | 'sent' | 'failed'
  created_at: string
  sent_at: string | null
}

export interface EmailLog {
  id: string
  campaign_id: string
  email: string
  status: 'pending' | 'sent' | 'failed'
  resend_id: string | null
  error: string | null
  sent_at: string | null
}
