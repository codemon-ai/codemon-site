"use client";

import { SlideProps } from "../../core/types";
import SlideFrame from "../../core/SlideFrame";
import FadeInGroup from "../../visuals/animations/FadeInGroup";

const faqs = [
  {
    q: "비개발자도 할 수 있나요?",
    a: "Lv.1은 가능, Lv.2부터는 개발자 도움 필요",
  },
  {
    q: "보안은 괜찮나요? 학습에 데이터 쓰이나요?",
    a: "Pro/API 플랜은 학습에 사용 안함, Enterprise는 추가 보장",
  },
  {
    q: "비용이 계속 늘어나나요?",
    a: "모델 분리+캐싱으로 개발자 1인 월 $100~200 유지, ROI는 즉시 체감",
  },
  {
    q: "5~10인 에이전시에도 효과 있나요?",
    a: "소규모 팀일수록 더 효과적",
  },
  {
    q: "어떤 업무부터 자동화?",
    a: "반복적이고 구조화된 비핵심 업무: 경쟁사 리서치, 코드 리뷰, 주간 보고",
  },
];

export default function FAQSlide({ isActive, slideIndex, totalSlides }: SlideProps) {
  return (
    <SlideFrame section={5} slideIndex={slideIndex} totalSlides={totalSlides}>
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
        Q&amp;A 예상 질문
      </h2>

      <FadeInGroup isActive={isActive} delay={200} className="space-y-4">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="bg-gray-800/40 border border-gray-700/40 rounded-xl px-6 py-4"
          >
            <div className="flex items-start gap-3 mb-2">
              <span className="text-[#a855f7] font-bold text-sm flex-shrink-0">
                Q{idx + 1}.
              </span>
              <span className="text-[#a855f7] font-bold text-sm">
                {faq.q}
              </span>
            </div>
            <div className="flex items-start gap-3 pl-0.5">
              <span className="text-gray-600 text-sm flex-shrink-0 ml-[1px]">
                A.
              </span>
              <span className="text-gray-300 text-sm leading-relaxed">
                {faq.a}
              </span>
            </div>
          </div>
        ))}
      </FadeInGroup>
    </SlideFrame>
  );
}
