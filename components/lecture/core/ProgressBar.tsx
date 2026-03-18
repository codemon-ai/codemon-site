"use client";

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const progress = ((current + 1) / total) * 100;

  return (
    <div className="absolute top-0 left-0 right-0 h-1 bg-gray-800 z-10">
      <div
        className="h-full transition-all duration-500 ease-out"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(to right, #7B61FF, #38BDF8)",
        }}
      />
    </div>
  );
}
