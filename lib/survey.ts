import { put } from '@vercel/blob'
import crypto from 'crypto'

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

const VALID_LECTURE_IDS = ['lecture-agency-ai', 'lecture-startup-ai']

export function isValidLectureId(id: string): boolean {
  return VALID_LECTURE_IDS.includes(id)
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
