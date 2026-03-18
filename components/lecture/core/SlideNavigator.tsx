"use client";

import { useState, useEffect } from "react";

interface SlideNavigatorProps {
  current: number;
  total: number;
  onNavigate: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function SlideNavigator({
  current,
  total,
  onNavigate,
  onPrev,
  onNext,
}: SlideNavigatorProps) {
  const [visible, setVisible] = useState(false);
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleMouseMove = () => {
      setVisible(true);
      if (hideTimeout) clearTimeout(hideTimeout);
      const t = setTimeout(() => setVisible(false), 3000);
      setHideTimeout(t);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (hideTimeout) clearTimeout(hideTimeout);
    };
  }, [hideTimeout]);

  return (
    <div
      className={`absolute bottom-0 left-0 right-0 flex items-center justify-center gap-3 py-4 transition-opacity duration-300 z-10 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Prev button */}
      <button
        onClick={onPrev}
        disabled={current === 0}
        className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700/50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        aria-label="Previous slide"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M12 15L7 10L12 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Dot indicators */}
      <div className="flex gap-1 items-center max-w-[360px] overflow-hidden">
        {Array.from({ length: total }, (_, i) => (
          <button
            key={i}
            onClick={() => onNavigate(i)}
            className={`rounded-full transition-all duration-300 flex-shrink-0 ${
              i === current
                ? "w-4 h-1.5 bg-[#a855f7]"
                : "w-1.5 h-1.5 bg-gray-600 hover:bg-gray-500"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Next button */}
      <button
        onClick={onNext}
        disabled={current === total - 1}
        className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700/50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        aria-label="Next slide"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M8 5L13 10L8 15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
