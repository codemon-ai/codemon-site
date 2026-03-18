"use client";

interface StatCardProps {
  value: string;
  label: string;
  sublabel?: string;
  color?: "purple" | "blue" | "green" | "amber";
  className?: string;
}

const colorMap = {
  purple: {
    border: "border-[#a855f7]/30",
    glow: "shadow-[0_0_20px_rgba(123,97,255,0.15)]",
    text: "text-[#a855f7]",
  },
  blue: {
    border: "border-[#38BDF8]/30",
    glow: "shadow-[0_0_20px_rgba(56,189,248,0.15)]",
    text: "text-[#38BDF8]",
  },
  green: {
    border: "border-emerald-500/30",
    glow: "shadow-[0_0_20px_rgba(16,185,129,0.15)]",
    text: "text-emerald-400",
  },
  amber: {
    border: "border-amber-500/30",
    glow: "shadow-[0_0_20px_rgba(245,158,11,0.15)]",
    text: "text-amber-400",
  },
};

export default function StatCard({
  value,
  label,
  sublabel,
  color = "purple",
  className = "",
}: StatCardProps) {
  const c = colorMap[color];

  return (
    <div
      className={`bg-gray-800/50 border ${c.border} ${c.glow} rounded-xl p-6 text-center ${className}`}
    >
      <div className={`text-3xl sm:text-4xl font-bold ${c.text} mb-2`}>
        {value}
      </div>
      <div className="text-white text-sm font-medium">{label}</div>
      {sublabel && (
        <div className="text-gray-400 text-xs mt-1">{sublabel}</div>
      )}
    </div>
  );
}
