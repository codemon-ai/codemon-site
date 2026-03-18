"use client";

import { SlideProps } from "../../core/types";
import SlideFrame from "../../core/SlideFrame";
import FadeInGroup from "../../visuals/animations/FadeInGroup";

export default function KoreanMarketSlide({ isActive, slideIndex, totalSlides }: SlideProps) {
  return (
    <SlideFrame section={1} slideIndex={slideIndex} totalSlides={totalSlides}>
      {/* Title */}
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
        한국 시장 동향
      </h2>

      {/* Quote block */}
      <FadeInGroup isActive={isActive} delay={300} className="mb-8">
        <div className="relative bg-gray-800/40 border-l-4 border-[#a855f7] rounded-r-xl px-6 py-5">
          <span className="absolute -top-3 -left-1 text-4xl text-[#a855f7]/30 font-serif">
            &ldquo;
          </span>
          <p className="text-lg sm:text-xl text-white font-medium leading-relaxed">
            Google·Microsoft 코드의{" "}
            <span className="text-[#a855f7] font-bold">30%</span>가 이미
            AI가 작성
          </p>
          <span className="absolute -bottom-4 right-4 text-4xl text-[#a855f7]/30 font-serif">
            &rdquo;
          </span>
        </div>
      </FadeInGroup>

      {/* Key points */}
      <FadeInGroup isActive={isActive} delay={250} className="space-y-4">
        <div className="flex items-start gap-4 bg-gray-800/50 border border-[#a855f7]/20 rounded-xl px-6 py-4 shadow-[0_0_20px_rgba(123,97,255,0.06)]">
          <div className="shrink-0 w-10 h-10 rounded-lg bg-[#a855f7]/10 flex items-center justify-center">
            <span className="text-[#a855f7] text-lg font-bold">1</span>
          </div>
          <div>
            <div className="text-white font-semibold mb-0.5">
              2026년 ={" "}
              <span className="bg-gradient-to-r from-[#a855f7] to-[#38BDF8] bg-clip-text text-transparent">
                &lsquo;에이전틱 AI의 해&rsquo;
              </span>
            </div>
            <div className="text-sm text-gray-400">
              자율 에이전트가 본격적으로 산업에 투입되는 원년
            </div>
          </div>
        </div>

        <div className="flex items-start gap-4 bg-gray-800/50 border border-[#38BDF8]/20 rounded-xl px-6 py-4 shadow-[0_0_20px_rgba(56,189,248,0.06)]">
          <div className="shrink-0 w-10 h-10 rounded-lg bg-[#38BDF8]/10 flex items-center justify-center">
            <span className="text-[#38BDF8] text-lg font-bold">2</span>
          </div>
          <div>
            <div className="text-white font-semibold mb-0.5">
              &lsquo;얼마나 했느냐&rsquo;에서{" "}
              <span className="text-[#38BDF8]">
                &lsquo;얼마나 잘 시켰느냐&rsquo;
              </span>
              로
            </div>
            <div className="text-sm text-gray-400">
              생산성의 정의가 바뀌는 전환점
            </div>
          </div>
        </div>
      </FadeInGroup>
    </SlideFrame>
  );
}
