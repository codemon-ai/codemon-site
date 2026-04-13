import { useRouter } from 'next/router'
import Head from 'next/head'
import { SurveyForm } from '../../components/SurveyForm'
import { QRCodeDisplay } from '../../components/QRCodeDisplay'

const LECTURES: Record<string, string> = {
  'lecture-agency-ai': 'AI 에이전트로 에이전시 업무 자동화하기',
  'lecture-startup-ai': 'AI 시대, 5명이 50명을 이기는 법',
  'lecture-podl-ai': 'AI로 일하는 방법',
}

export default function SurveyPage() {
  const router = useRouter()
  const lectureId = router.query.lectureId as string
  const lectureTitle = LECTURES[lectureId]

  if (!lectureId || !lectureTitle) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-zinc-900">
        <p className="text-zinc-500">유효하지 않은 설문입니다.</p>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>강의 설문 — {lectureTitle}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="mx-auto max-w-2xl px-4 py-12">
        <h1 className="mb-2 text-2xl font-bold text-black dark:text-white">강의 설문</h1>
        <SurveyForm lectureId={lectureId} lectureTitle={lectureTitle} />
        <div className="mt-12 flex justify-center">
          <QRCodeDisplay url={`https://codemon.ai/survey/${lectureId}`} />
        </div>
      </div>
    </>
  )
}
