import type { NextApiRequest, NextApiResponse } from 'next'
import { saveSurveyResponse, isValidLectureId } from '../../../lib/survey'
import { sendSlackNotification } from '../../../lib/slack'

const LECTURE_TITLES: Record<string, string> = {
  'lecture-agency-ai': 'AI 에이전트로 에이전시 업무 자동화하기',
  'lecture-startup-ai': 'AI 시대, 5명이 50명을 이기는 법',
  'lecture-podl-ai': 'AI로 일하는 방법',
  'airpremia-lv1': 'Airpremia Level 1 · Claude 생태계 실무 교육',
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const {
    lectureId, companyName, contactName, title,
    email, phone, rating, gains, questions,
    learnings, followAlong, wouldHelp, improvements,
    privacyConsent,
  } = req.body

  // Validation
  if (!lectureId || !isValidLectureId(lectureId)) {
    return res.status(400).json({ error: '유효하지 않은 강의입니다' })
  }
  if (!companyName?.trim() || !contactName?.trim() || !title?.trim()) {
    return res.status(400).json({ error: '회사명, 담당자명, 직함을 입력해주세요' })
  }
  if (!email?.trim() || !/^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/i.test(email.trim())) {
    return res.status(400).json({ error: '올바른 이메일을 입력해주세요' })
  }
  if (!phone?.trim()) {
    return res.status(400).json({ error: '연락처를 입력해주세요' })
  }
  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ error: '별점을 선택해주세요' })
  }
  if (!privacyConsent) {
    return res.status(400).json({ error: '개인정보 수집에 동의해주세요' })
  }

  try {
    const response = await saveSurveyResponse({
      lectureId,
      companyName: companyName.trim(),
      contactName: contactName.trim(),
      title: title.trim(),
      email: email.trim(),
      phone: phone.trim(),
      rating: Number(rating),
      gains: gains?.trim() || '',
      questions: questions?.trim() || '',
      learnings: learnings?.trim() || '',
      followAlong: followAlong?.trim() || '',
      wouldHelp: wouldHelp?.trim() || '',
      improvements: improvements?.trim() || '',
      privacyConsent: true,
    })

    // Slack notification
    const stars = '⭐'.repeat(response.rating) + '☆'.repeat(5 - response.rating)
    const lectureName = LECTURE_TITLES[lectureId] || lectureId
    const lines = [
      `📋 새 설문 응답 [${lectureName}]`,
      ``,
      `회사: ${response.companyName}`,
      `담당자: ${response.contactName} (${response.title})`,
      `이메일: ${response.email} | 연락처: ${response.phone}`,
      `별점: ${stars} (${response.rating}/5)`,
      response.gains ? `\n얻은 점: ${response.gains}` : '',
      response.learnings ? `배운 것: ${response.learnings}` : '',
      response.followAlong ? `진행도: ${response.followAlong}` : '',
      response.wouldHelp ? `있으면 좋을 것: ${response.wouldHelp}` : '',
      response.improvements ? `개선 요청: ${response.improvements}` : '',
      response.questions ? `궁금한 점: ${response.questions}` : '',
    ].filter(Boolean).join('\n')

    await sendSlackNotification(lines)

    return res.status(200).json({ ok: true, responseId: response.id })
  } catch {
    return res.status(500).json({ error: '처리 중 오류가 발생했습니다' })
  }
}
