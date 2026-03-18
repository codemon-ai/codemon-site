"use client";

interface GlowPulseProps {
  children: React.ReactNode;
  color?: "purple" | "blue";
  className?: string;
}

const glowColors = {
  purple: {
    shadow: "rgba(123, 97, 255, 0.4)",
    shadowLarge: "rgba(123, 97, 255, 0.2)",
  },
  blue: {
    shadow: "rgba(56, 189, 248, 0.4)",
    shadowLarge: "rgba(56, 189, 248, 0.2)",
  },
};

export default function GlowPulse({
  children,
  color = "purple",
  className = "",
}: GlowPulseProps) {
  const c = glowColors[color];

  return (
    <div
      className={`animate-glow-pulse ${className}`}
      style={
        {
          "--glow-color": c.shadow,
          "--glow-color-lg": c.shadowLarge,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
