'use client';

import React, { useState } from "react";

const sections = [
  {
    id: "credentials",
    number: "01",
    title: "계정 자격 증명 공유 금지",
    section: "Section 2 — Account Creation and Access",
    severity: "high" as const,
    quote: '"You may not share your Account login information, Anthropic API key, or Account credentials with anyone else."',
    analysis: "setup-token은 본질적으로 계정 자격 증명(Account credentials)에 해당합니다. 이를 서드파티 도구에 넘기는 행위 자체가 이 조항에 직접적으로 저촉됩니다.",
    icon: "🔐",
  },
  {
    id: "automated",
    number: "02",
    title: "자동화 수단 접근 금지",
    section: "Section 3(7) — Use of Our Services",
    severity: "critical" as const,
    quote: '"Except when you are accessing our Services via an Anthropic API Key or where we otherwise explicitly permit it, to access the Services through automated or non-human means, whether through a bot, script, or otherwise."',
    analysis: "가장 핵심적인 조항입니다. API 키를 사용하는 경우만 명시적으로 예외 처리되어 있으며, setup-token을 통한 자동화 접근은 허용 범위에 포함되지 않습니다. 봇/스크립트에 해당하므로 명백한 위반입니다.",
    icon: "🤖",
  },
  {
    id: "termination",
    number: "03",
    title: "위반 시 즉시 해지 가능",
    section: "Section 12 — Termination",
    severity: "high" as const,
    quote: '"We may suspend or terminate your access to the Services (including any Subscriptions) at any time without notice to you if we believe that you have breached these Terms."',
    analysis: "약관 위반으로 판단될 경우 사전 통보 없이 서비스 접근이 차단되며, 남은 구독 요금의 환불도 받을 수 없습니다.",
    icon: "⛔",
  },
];

const severityConfig = {
  critical: {
    label: "위반 확실",
    bg: "linear-gradient(135deg, #dc2626 0%, #991b1b 100%)",
    text: "#fff",
    border: "#ef4444",
    glow: "0 0 20px rgba(239, 68, 68, 0.3)",
  },
  high: {
    label: "위반 가능성 높음",
    bg: "linear-gradient(135deg, #ea580c 0%, #9a3412 100%)",
    text: "#fff",
    border: "#f97316",
    glow: "0 0 20px rgba(249, 115, 22, 0.25)",
  },
  medium: {
    label: "주의 필요",
    bg: "linear-gradient(135deg, #ca8a04 0%, #854d0e 100%)",
    text: "#fff",
    border: "#eab308",
    glow: "0 0 20px rgba(234, 179, 8, 0.2)",
  },
};

type Severity = "critical" | "high" | "medium";

function SeverityBadge({ severity }: { severity: Severity }) {
  const config = severityConfig[severity];
  return (
    <span
      className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase whitespace-nowrap"
      style={{
        background: config.bg,
        color: config.text,
      }}
    >
      {config.label}
    </span>
  );
}

function AnalysisCard({ item, index, isOpen, onToggle }: any) {
  const config = severityConfig[item.severity as Severity];
  return (
    <div
      onClick={onToggle}
      className="cursor-pointer transition-all duration-300 transform"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${isOpen ? config.border : "rgba(255,255,255,0.08)"}`,
        borderRadius: "16px",
        padding: "24px 28px",
        boxShadow: isOpen ? config.glow : "none",
        transform: isOpen ? "scale(1.005)" : "scale(1)",
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col md:flex-row items-start gap-4 flex-1">
          <div className="text-3xl min-w-[36px] text-center">
            {item.icon}
          </div>
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-2 flex-wrap">
              <span className="font-mono text-white/30 text-xs font-semibold">
                {item.number}
              </span>
              <h3 className="m-0 text-base md:text-lg font-bold text-white tracking-tight">
                {item.title}
              </h3>
              <SeverityBadge severity={item.severity} />
            </div>
            <p className="m-0 text-xs/tight font-mono text-white/40">
              {item.section}
            </p>
          </div>
        </div>
        <div
          className="text-white/30 transition-transform duration-300 mt-1"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          ▾
        </div>
      </div>

      {isOpen && (
        <div className="mt-6 md:pl-14">
          <div
            className="rounded-r-lg px-5 py-4 mb-4"
            style={{
              background: "rgba(255,255,255,0.04)",
              borderLeft: `3px solid ${config.border}`,
            }}
          >
            <p className="m-0 text-sm italic text-white/55 leading-relaxed font-serif">
              {item.quote}
            </p>
          </div>
          <p className="m-0 text-sm md:text-base text-white/80 leading-relaxed">
            {item.analysis}
          </p>
        </div>
      )}
    </div>
  );
}

export default function AnthropicBanAnalysis() {
  const [openCards, setOpenCards] = useState<Set<string>>(new Set(["automated"]));

  const toggle = (id: string) => {
    setOpenCards((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="w-full bg-[#0d121c] text-slate-200 rounded-xl p-4 md:p-8 border border-white/10 my-8 shadow-2xl overflow-hidden font-sans">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/25 rounded-full px-4 py-1.5 mb-5">
            <span className="text-sm">⚠️</span>
            <span className="text-xs font-bold text-red-400 tracking-widest uppercase">
              Legal Risk Analysis
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold leading-tight mb-3 tracking-tighter bg-gradient-to-br from-slate-100 to-slate-400 bg-clip-text text-transparent">
            구독 계정 기반 자동화 시<br />Anthropic 약관 위반 분석
          </h2>
          <p className="text-sm text-white/45 m-0 leading-relaxed w-full">
            Anthropic Consumer Terms of Service (2025년 최신)를 기준으로, setup-token(구독 계정 토큰)을 활용한 자동화 에이전트 구동에 대한 법적 리스크를 해부합니다.
          </p>
        </div>

        <div className="bg-gradient-to-br from-red-600/10 to-red-900/10 border border-red-500/20 rounded-2xl p-6 mb-8 flex items-center gap-5">
          <div className="text-4xl leading-none">🚫</div>
          <div>
            <h3 className="m-0 mb-1.5 text-lg font-bold text-red-300">
              종합 판단: 위반 확실 (Critical)
            </h3>
            <p className="m-0 text-sm text-white/55 leading-relaxed">
              API 계정이 아닌 구독 토큰 방식으로 스크립트/에이전트 구동 시 명시적 예외 조항을 벗어나며, 적발 시 계정이 즉시 정지될 수 있습니다.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {sections.map((item, i) => (
            <AnalysisCard
              key={item.id}
              item={item}
              index={i}
              isOpen={openCards.has(item.id)}
              onToggle={() => toggle(item.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
