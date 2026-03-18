"use client";

import { SlideProps } from "../../core/types";
import SlideFrame from "../../core/SlideFrame";
import FadeInGroup from "../../visuals/animations/FadeInGroup";

const tiers = [
  {
    tier: "1인 (시작)",
    plan: "Claude Pro",
    cost: "$20/월",
    color: "from-gray-500/20 to-gray-600/10 border-gray-500/30",
    costColor: "text-gray-300",
    icon: "👤",
  },
  {
    tier: "소규모 팀",
    plan: "Max 5x",
    cost: "$100/월",
    color: "from-blue-500/20 to-blue-600/10 border-blue-500/30",
    costColor: "text-[#38BDF8]",
    icon: "👥",
  },
  {
    tier: "활발한 사용",
    plan: "Max 20x + API",
    cost: "$200/월",
    color: "from-purple-500/20 to-purple-600/10 border-purple-500/30",
    costColor: "text-[#a855f7]",
    icon: "🚀",
  },
  {
    tier: "풀 파이프라인",
    plan: "API 직접 사용",
    cost: "$500+/월",
    color: "from-amber-500/20 to-amber-600/10 border-amber-500/30",
    costColor: "text-amber-400",
    icon: "🏢",
  },
];

export default function AgencyCostSlide({ isActive, slideIndex, totalSlides }: SlideProps) {
  return (
    <SlideFrame section={3} slideIndex={slideIndex} totalSlides={totalSlides}>
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
        에이전시 규모별 비용 시뮬레이션
      </h2>

      <FadeInGroup
        isActive={isActive}
        delay={200}
        className="grid grid-cols-2 sm:grid-cols-4 gap-4"
      >
        {tiers.map((tier) => (
          <div
            key={tier.tier}
            className={`bg-gradient-to-br ${tier.color} border rounded-xl p-5 text-center transition-all duration-300 hover:scale-[1.02]`}
          >
            <span className="text-3xl block mb-3">{tier.icon}</span>
            <h3 className="text-white font-bold text-sm mb-1">{tier.tier}</h3>
            <p className="text-gray-400 text-xs mb-3">{tier.plan}</p>
            <div
              className={`text-2xl sm:text-3xl font-bold ${tier.costColor}`}
            >
              {tier.cost}
            </div>
          </div>
        ))}
      </FadeInGroup>
    </SlideFrame>
  );
}
