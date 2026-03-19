"use client";

import { SlideProps } from "../../core/types";
import SlideFrame from "../../core/SlideFrame";
import FadeInGroup from "../../visuals/animations/FadeInGroup";

const models = [
  {
    name: "Opus 4.6",
    input: "$15/1M",
    output: "$75/1M",
    usage: "복잡한 추론 (최고 성능)",
    recommended: true,
  },
  {
    name: "Sonnet 4.6",
    input: "$3/1M",
    output: "$15/1M",
    usage: "일상 개발 (최적가성비)",
    recommended: false,
  },
  {
    name: "Haiku 4.5",
    input: "$1/1M",
    output: "$5/1M",
    usage: "단순 작업",
    recommended: false,
  },
];

export default function ModelPricingSlide({
  isActive,
  slideIndex,
  totalSlides,
}: SlideProps) {
  return (
    <SlideFrame section={3} slideIndex={slideIndex} totalSlides={totalSlides}>
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
        비용 현실 — 모델별 가격
      </h2>

      <FadeInGroup isActive={isActive} delay={200}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="px-5 py-3 text-left font-semibold text-gray-400">
                  모델
                </th>
                <th className="px-5 py-3 text-left font-semibold text-gray-400">
                  Input
                </th>
                <th className="px-5 py-3 text-left font-semibold text-gray-400">
                  Output
                </th>
                <th className="px-5 py-3 text-left font-semibold text-gray-400">
                  용도
                </th>
              </tr>
            </thead>
            <tbody>
              {models.map((model) => (
                <tr
                  key={model.name}
                  className={`border-b border-gray-800 transition-colors ${
                    model.recommended
                      ? "bg-[#a855f7]/10 border-l-2 border-l-[#a855f7]"
                      : "hover:bg-gray-800/50"
                  }`}
                >
                  <td className="px-5 py-4">
                    <span
                      className={`font-bold ${
                        model.recommended ? "text-[#a855f7]" : "text-white"
                      }`}
                    >
                      {model.name}
                    </span>
                    {model.recommended && (
                      <span className="ml-2 bg-[#a855f7]/20 text-[#a855f7] text-xs font-bold px-2 py-0.5 rounded-full">
                        추천
                      </span>
                    )}
                  </td>
                  <td
                    className={`px-5 py-4 font-mono ${
                      model.recommended ? "text-white" : "text-gray-300"
                    }`}
                  >
                    {model.input}
                  </td>
                  <td
                    className={`px-5 py-4 font-mono ${
                      model.recommended ? "text-white" : "text-gray-300"
                    }`}
                  >
                    {model.output}
                  </td>
                  <td
                    className={`px-5 py-4 ${
                      model.recommended
                        ? "text-[#38BDF8] font-medium"
                        : "text-gray-400"
                    }`}
                  >
                    {model.usage}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </FadeInGroup>
    </SlideFrame>
  );
}
