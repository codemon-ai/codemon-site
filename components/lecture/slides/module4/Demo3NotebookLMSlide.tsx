"use client";

import { SlideProps } from "../../core/types";
import SlideFrame from "../../core/SlideFrame";
import FadeInGroup from "../../visuals/animations/FadeInGroup";

export default function Demo3NotebookLMSlide({
  isActive,
  slideIndex,
  totalSlides,
}: SlideProps) {
  return (
    <SlideFrame section={4} slideIndex={slideIndex} totalSlides={totalSlides}>
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
        Demo 3 — MCP 이용{" "}
        <span className="text-[#38BDF8]">NotebookLM</span>
      </h2>
      <p className="text-sm text-gray-500 mb-6">notebooklm.google.com</p>

      <FadeInGroup isActive={isActive} delay={250} className="flex flex-col gap-6">
        <div className="bg-gray-800/50 border border-[#38BDF8]/20 rounded-xl p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#38BDF8]/10 border border-[#38BDF8]/30 flex items-center justify-center">
              <span className="text-2xl">🔌</span>
            </div>
            <div>
              <h3 className="text-white font-semibold">MCP 연동 예시</h3>
              <p className="text-gray-400 text-xs">
                MCP로 NotebookLM과 Claude를 연결하는 시나리오
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center">
            {[
              { label: "Claude", icon: "🤖" },
              { label: "MCP", icon: "🔌" },
              { label: "NotebookLM", icon: "📓" },
            ].map((item, i) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="bg-gray-700/50 border border-gray-600/40 rounded-lg px-4 py-3 text-center">
                  <span className="text-xl block mb-1">{item.icon}</span>
                  <span className="text-xs text-gray-300">{item.label}</span>
                </div>
                {i < 2 && (
                  <svg width="28" height="16" viewBox="0 0 28 16" fill="none">
                    <line x1="0" y1="6" x2="28" y2="6" stroke="#38BDF8" strokeOpacity="0.4" strokeWidth="1.5" />
                    <line x1="0" y1="10" x2="28" y2="10" stroke="#7B61FF" strokeOpacity="0.4" strokeWidth="1.5" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Live demo indicator */}
        <div className="flex justify-center">
          <div className="flex items-center gap-2 bg-[#38BDF8]/10 border border-[#38BDF8]/30 rounded-full px-5 py-2">
            <span className="w-2 h-2 rounded-full bg-[#7DD3FC] animate-pulse" />
            <span className="text-sm text-[#7DD3FC] font-medium">라이브 데모</span>
          </div>
        </div>
      </FadeInGroup>
    </SlideFrame>
  );
}
