'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { StarRating } from './StarRating'
import { CheckCircle } from 'lucide-react'

interface SurveyFormProps {
  lectureId: string
  lectureTitle: string
}

export function SurveyForm({ lectureId, lectureTitle }: SurveyFormProps) {
  const [companyName, setCompanyName] = useState('')
  const [contactName, setContactName] = useState('')
  const [title, setTitle] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [rating, setRating] = useState(0)
  const [gains, setGains] = useState('')
  const [learnings, setLearnings] = useState('')
  const [followAlong, setFollowAlong] = useState('')
  const [wouldHelp, setWouldHelp] = useState('')
  const [improvements, setImprovements] = useState('')
  const [questions, setQuestions] = useState('')
  const [privacyConsent, setPrivacyConsent] = useState(false)
  const [status, setStatus] = useState<'form' | 'sending' | 'success'>('form')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    if (rating === 0) {
      setError('강의 별점을 선택해주세요.')
      return
    }
    if (!privacyConsent) {
      setError('개인정보 수집에 동의해주세요.')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch('/api/survey/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lectureId, companyName, contactName, title,
          email, phone, rating, gains, questions,
          learnings, followAlong, wouldHelp, improvements,
          privacyConsent,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || '오류가 발생했습니다.')
        setStatus('form')
        return
      }
      setStatus('success')
    } catch {
      setError('네트워크 오류가 발생했습니다.')
      setStatus('form')
    }
  }

  const inputClass = 'w-full px-4 py-3 rounded-lg text-sm bg-black/[0.03] dark:bg-white/[0.06] border border-black/[0.08] dark:border-white/[0.06] text-black dark:text-white placeholder:text-black/30 dark:placeholder:text-white/30 outline-none focus:border-accent-purple transition-colors'

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-16"
      >
        <CheckCircle size={48} className="mx-auto mb-4 text-accent-purple" />
        <h2 className="text-2xl font-bold text-black dark:text-white mb-2">
          감사합니다!
        </h2>
        <p className="text-black/50 dark:text-white/45">
          소중한 피드백이 전달되었습니다.
        </p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <p className="text-sm text-black/50 dark:text-white/45 mb-8">
        <strong>{lectureTitle}</strong> 강의에 참석해 주셔서 감사합니다. 아래 설문에 응해주시면 더 나은 강의를 준비하는 데 큰 도움이 됩니다.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* 회사이름 */}
        <div>
          <label className="block text-sm font-medium text-black dark:text-white mb-1.5">
            회사이름 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
            placeholder="회사명을 입력하세요"
            className={inputClass}
          />
        </div>

        {/* 담당자이름 + 직함 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-1.5">
              담당자이름 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              required
              placeholder="이름"
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-1.5">
              직함 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="직함"
              className={inputClass}
            />
          </div>
        </div>

        {/* 이메일 + 연락처 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-1.5">
              이메일 <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="email@company.com"
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-1.5">
              연락처 <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="010-0000-0000"
              className={inputClass}
            />
          </div>
        </div>

        {/* 별점 */}
        <div>
          <label className="block text-sm font-medium text-black dark:text-white mb-1.5">
            강의 내용 별점 <span className="text-red-500">*</span>
          </label>
          <StarRating
            value={rating}
            onChange={setRating}
            disabled={status === 'sending'}
          />
        </div>

        {/* 강의에서 얻은 점 */}
        <div>
          <label className="block text-sm font-medium text-black dark:text-white mb-1.5">
            강의에서 얻은 점 <span className="text-black/30 dark:text-white/30">(선택)</span>
          </label>
          <textarea
            value={gains}
            onChange={(e) => setGains(e.target.value)}
            placeholder="강의를 통해 얻은 인사이트가 있다면 알려주세요"
            rows={3}
            className={inputClass + ' resize-none'}
          />
        </div>

        {/* 본인이 배운 것들 */}
        <div>
          <label className="block text-sm font-medium text-black dark:text-white mb-1.5">
            본인이 배운 것들 <span className="text-black/30 dark:text-white/30">(선택)</span>
          </label>
          <textarea
            value={learnings}
            onChange={(e) => setLearnings(e.target.value)}
            placeholder="강의에서 새로 배운 개념·도구·방법이 있다면 적어주세요"
            rows={3}
            className={inputClass + ' resize-none'}
          />
        </div>

        {/* 어디까지 따라 갔는지 */}
        <div>
          <label className="block text-sm font-medium text-black dark:text-white mb-1.5">
            어디까지 따라 갔는지 <span className="text-black/30 dark:text-white/30">(선택)</span>
          </label>
          <textarea
            value={followAlong}
            onChange={(e) => setFollowAlong(e.target.value)}
            placeholder="실습·예제를 어느 단계까지 따라 하셨는지 알려주세요 (막힌 구간이 있다면 함께 적어주세요)"
            rows={3}
            className={inputClass + ' resize-none'}
          />
        </div>

        {/* 어떤 것이 있으면 도움이 될지 */}
        <div>
          <label className="block text-sm font-medium text-black dark:text-white mb-1.5">
            어떤 것이 있으면 도움이 될지 <span className="text-black/30 dark:text-white/30">(선택)</span>
          </label>
          <textarea
            value={wouldHelp}
            onChange={(e) => setWouldHelp(e.target.value)}
            placeholder="추가 자료·실습·템플릿 등 있으면 좋겠다 싶은 것을 적어주세요"
            rows={3}
            className={inputClass + ' resize-none'}
          />
        </div>

        {/* 개선이 되었으면 하는 부분 */}
        <div>
          <label className="block text-sm font-medium text-black dark:text-white mb-1.5">
            개선이 되었으면 하는 부분 <span className="text-black/30 dark:text-white/30">(선택)</span>
          </label>
          <textarea
            value={improvements}
            onChange={(e) => setImprovements(e.target.value)}
            placeholder="강의 구성·속도·난이도 등 개선 의견을 자유롭게 적어주세요"
            rows={3}
            className={inputClass + ' resize-none'}
          />
        </div>

        {/* 더 궁금한 점 */}
        <div>
          <label className="block text-sm font-medium text-black dark:text-white mb-1.5">
            더 궁금한 점 <span className="text-black/30 dark:text-white/30">(선택)</span>
          </label>
          <textarea
            value={questions}
            onChange={(e) => setQuestions(e.target.value)}
            placeholder="추가로 궁금한 점이 있다면 남겨주세요"
            rows={3}
            className={inputClass + ' resize-none'}
          />
        </div>

        {/* 개인정보수집동의 */}
        <div className="rounded-lg border border-black/[0.08] dark:border-white/[0.06] p-4">
          <p className="text-xs text-black/50 dark:text-white/45 mb-3 leading-relaxed">
            개인정보 수집 및 이용 안내<br />
            • 수집 항목: 회사명, 성명, 직함, 이메일, 연락처, 설문 응답<br />
            • 이용 목적: 강의 피드백 분석 및 후속 안내<br />
            • 보유 기간: 수집일로부터 1년
          </p>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={privacyConsent}
              onChange={(e) => setPrivacyConsent(e.target.checked)}
              className="w-4 h-4 accent-accent-purple"
            />
            <span className="text-sm text-black dark:text-white">
              개인정보 수집 및 이용에 동의합니다 <span className="text-red-500">*</span>
            </span>
          </label>
        </div>

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full py-3 rounded-lg bg-accent-purple text-white font-semibold text-base hover:opacity-80 transition-opacity disabled:opacity-50"
        >
          {status === 'sending' ? '제출 중...' : '설문 제출하기'}
        </button>
      </form>
    </motion.div>
  )
}
