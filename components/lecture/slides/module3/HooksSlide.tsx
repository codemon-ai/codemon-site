"use client";

import { SlideProps } from "../../core/types";
import SlideFrame from "../../core/SlideFrame";
import FadeInGroup from "../../visuals/animations/FadeInGroup";

const hooks = [
  {
    name: "PreToolUse",
    desc: "프로덕션 DB 수정 차단",
    icon: "🛡️",
    color: "from-red-500/20 to-red-600/10 border-red-500/30",
    textColor: "text-red-400",
  },
  {
    name: "PostToolUse",
    desc: "코드 변경 후 자동 포맷+린트",
    icon: "✨",
    color: "from-blue-500/20 to-blue-600/10 border-blue-500/30",
    textColor: "text-blue-400",
  },
  {
    name: "SessionStart",
    desc: "프로젝트 컨텍스트 자동 로드",
    icon: "🚀",
    color: "from-emerald-500/20 to-emerald-600/10 border-emerald-500/30",
    textColor: "text-emerald-400",
  },
  {
    name: "Stop",
    desc: "완료 시 Slack/Telegram 알림",
    icon: "📢",
    color: "from-amber-500/20 to-amber-600/10 border-amber-500/30",
    textColor: "text-amber-400",
  },
];

export default function HooksSlide({ isActive, slideIndex, totalSlides }: SlideProps) {
  return (
    <SlideFrame section={2} slideIndex={slideIndex} totalSlides={totalSlides}>
      <div className="flex items-center gap-3 mb-4">
        <span className="text-[10px] text-[#A78BFA] bg-[#7B61FF]/10 border border-[#7B61FF]/30 rounded-full px-3 py-1 font-medium">
          에이전트 딥다이브 ②
        </span>
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
        훅(Hooks) = 자동 가드레일
      </h2>

      <FadeInGroup isActive={isActive} delay={200} className="space-y-3">
        {hooks.map((hook, i) => (
          <div key={hook.name} className="flex items-center gap-4">
            {/* Hook card */}
            <div
              className={`flex-1 flex items-center gap-4 bg-gradient-to-r ${hook.color} border rounded-xl px-5 py-4`}
            >
              <span className="text-2xl">{hook.icon}</span>
              <div className="flex-1">
                <h3 className={`font-bold text-base ${hook.textColor}`}>
                  {hook.name}
                </h3>
                <p className="text-gray-300 text-sm">{hook.desc}</p>
              </div>
            </div>

            {/* Arrow (except last) */}
            {i < hooks.length - 1 && (
              <div className="flex flex-col items-center w-6">
                <svg
                  width="24"
                  height="32"
                  viewBox="0 0 24 32"
                  fill="none"
                  className="text-[#a855f7]/60"
                >
                  <path
                    d="M12 2V24"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M6 18L12 26L18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
      </FadeInGroup>
    </SlideFrame>
  );
}
