"use client";

import { SlideProps } from "../../core/types";
import SlideFrame from "../../core/SlideFrame";
import FadeInGroup from "../../visuals/animations/FadeInGroup";

const agents = [
  {
    emoji: "🎯",
    name: "Rody",
    role: "PM & 오케스트레이터",
    desc: "기획, 블로깅, 팀 조율",
    color: "from-purple-500/20 to-purple-600/10 border-purple-500/30",
  },
  {
    emoji: "🔍",
    name: "Nubi",
    role: "QA & 개발",
    desc: "코드 리뷰, 테스트, 디버깅",
    color: "from-blue-500/20 to-blue-600/10 border-blue-500/30",
  },
  {
    emoji: "✍️",
    name: "Narae",
    role: "콘텐츠 & 마케팅",
    desc: "리서치, 큐레이션, SEO",
    color: "from-pink-500/20 to-pink-600/10 border-pink-500/30",
  },
  {
    emoji: "🎨",
    name: "Bear",
    role: "디자인 & 프론트엔드",
    desc: "UI/UX, 컴포넌트",
    color: "from-amber-500/20 to-amber-600/10 border-amber-500/30",
  },
  {
    emoji: "🔭",
    name: "Newbi",
    role: "리서치 & 스카우트",
    desc: "트렌드, 경쟁사 분석",
    color: "from-emerald-500/20 to-emerald-600/10 border-emerald-500/30",
  },
  {
    emoji: "⚙️",
    name: "Octo",
    role: "백엔드 & 인프라",
    desc: "서버, API, 인프라",
    color: "from-cyan-500/20 to-cyan-600/10 border-cyan-500/30",
  },
  {
    emoji: "📊",
    name: "Owl",
    role: "데이터 & 자동화",
    desc: "데이터 처리, 자동화",
    color: "from-violet-500/20 to-violet-600/10 border-violet-500/30",
  },
];

export default function AgentTeamIntroSlide({
  isActive,
  slideIndex,
  totalSlides,
}: SlideProps) {
  return (
    <SlideFrame section={3} slideIndex={slideIndex} totalSlides={totalSlides}>
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
        그래서 난 이런 팀을 이루었다
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        역할은 언제든지 바뀔 수 있다 — 유연한 AI 팀 구성
      </p>

      <FadeInGroup isActive={isActive} delay={100} className="space-y-3">
        {/* Top row: 4 agents */}
        <div className="grid grid-cols-4 gap-3">
          {agents.slice(0, 4).map((agent) => (
            <div
              key={agent.name}
              className={`bg-gradient-to-br ${agent.color} border rounded-xl p-4 text-center transition-all duration-300 hover:scale-[1.02]`}
            >
              <span className="text-3xl block mb-2">{agent.emoji}</span>
              <h3 className="text-white font-bold text-base">{agent.name}</h3>
              <p className="text-[#a855f7] text-xs font-medium mt-1">
                {agent.role}
              </p>
              <p className="text-gray-400 text-xs mt-1">{agent.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom row: 3 agents */}
        <div className="grid grid-cols-4 gap-3">
          <div className="col-start-1 col-span-4 flex justify-center gap-3">
            {agents.slice(4).map((agent) => (
              <div
                key={agent.name}
                className={`bg-gradient-to-br ${agent.color} border rounded-xl p-4 text-center transition-all duration-300 hover:scale-[1.02] w-full max-w-[calc(25%-0.5rem)]`}
              >
                <span className="text-3xl block mb-2">{agent.emoji}</span>
                <h3 className="text-white font-bold text-base">
                  {agent.name}
                </h3>
                <p className="text-[#a855f7] text-xs font-medium mt-1">
                  {agent.role}
                </p>
                <p className="text-gray-400 text-xs mt-1">{agent.desc}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Pipeline connection */}
        <div className="text-center text-sm text-gray-500 mt-1">
          이 친구들로 다음과 같은{" "}
          <span className="text-[#a855f7] font-medium">파이프라인</span>을 가질 수 있다 →
        </div>
      </FadeInGroup>
    </SlideFrame>
  );
}
