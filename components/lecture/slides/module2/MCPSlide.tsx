"use client";

import { SlideProps } from "../../core/types";
import SlideFrame from "../../core/SlideFrame";
import FadeInGroup from "../../visuals/animations/FadeInGroup";

const spokes = [
  { label: "Slack", angle: 0 },
  { label: "Google Calendar", angle: 60 },
  { label: "GitHub", angle: 120 },
  { label: "DB", angle: 180 },
  { label: "파일시스템", angle: 240 },
  { label: "1,000+ 서버", angle: 300 },
];

const HUB_R = 140;
const SPOKE_R = 44;
const CX = 200;
const CY = 170;

function toXY(angleDeg: number, r: number) {
  const rad = (angleDeg - 90) * (Math.PI / 180);
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

export default function MCPSlide({ isActive, slideIndex, totalSlides }: SlideProps) {
  return (
    <SlideFrame section={2} slideIndex={slideIndex} totalSlides={totalSlides}>
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
        MCP &mdash; AI의 USB-C 포트
      </h2>

      <FadeInGroup isActive={isActive} delay={200} className="flex flex-col items-center gap-6">
        {/* Hub-and-spoke diagram */}
        <div className="relative" style={{ width: 400, height: 340 }}>
          <svg width="400" height="340" viewBox="0 0 400 340" fill="none">
            {/* Spoke lines */}
            {spokes.map((s) => {
              const pos = toXY(s.angle, HUB_R);
              return (
                <line
                  key={s.label}
                  x1={CX}
                  y1={CY}
                  x2={pos.x}
                  y2={pos.y}
                  stroke="#7B61FF"
                  strokeOpacity="0.3"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                />
              );
            })}

            {/* Center hub glow */}
            <circle cx={CX} cy={CY} r="52" fill="#7B61FF" fillOpacity="0.08" />
            <circle cx={CX} cy={CY} r="44" fill="#7B61FF" fillOpacity="0.12" />
            <circle
              cx={CX}
              cy={CY}
              r="38"
              fill="none"
              stroke="#7B61FF"
              strokeWidth="2"
              strokeOpacity="0.6"
            />
            <text
              x={CX}
              y={CY + 1}
              textAnchor="middle"
              dominantBaseline="central"
              fill="white"
              fontWeight="bold"
              fontSize="16"
            >
              MCP
            </text>

            {/* Spoke nodes */}
            {spokes.map((s) => {
              const pos = toXY(s.angle, HUB_R);
              return (
                <g key={s.label}>
                  <rect
                    x={pos.x - SPOKE_R}
                    y={pos.y - 16}
                    width={SPOKE_R * 2}
                    height={32}
                    rx="8"
                    fill="#1E293B"
                    stroke="#38BDF8"
                    strokeOpacity="0.35"
                    strokeWidth="1.5"
                  />
                  <text
                    x={pos.x}
                    y={pos.y + 1}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="#7DD3FC"
                    fontSize="11"
                    fontWeight="500"
                  >
                    {s.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Key message */}
        <p className="text-sm sm:text-base text-gray-300 text-center max-w-xl leading-relaxed">
          AI 에이전트가 외부 도구/서비스에 접근하는{" "}
          <span className="text-[#A78BFA] font-semibold">표준 프로토콜</span>
        </p>

        {/* Bottom note */}
        <p className="text-xs text-gray-500 text-center">
          OpenAI, Google, Microsoft도 채택 &rarr; 업계 표준
        </p>
      </FadeInGroup>
    </SlideFrame>
  );
}
