"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { SlideConfig } from "./types";
import ProgressBar from "./ProgressBar";
import SlideNavigator from "./SlideNavigator";

interface PresentationProps {
  slides: SlideConfig[];
}

export default function Presentation({ slides }: PresentationProps) {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  // Initialize from URL hash
  useEffect(() => {
    const hash = window.location.hash;
    const match = hash.match(/slide=(\d+)/);
    if (match) {
      const idx = parseInt(match[1], 10);
      if (idx >= 0 && idx < slides.length) {
        setCurrentSlide(idx);
      }
    }
  }, [slides.length]);

  // Sync URL hash
  useEffect(() => {
    window.location.hash = `slide=${currentSlide}`;
  }, [currentSlide]);

  const goTo = useCallback(
    (index: number) => {
      if (index < 0 || index >= slides.length || isTransitioning) return;
      setDirection(index > currentSlide ? "next" : "prev");
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide(index);
        setIsTransitioning(false);
      }, 200);
    },
    [currentSlide, slides.length, isTransitioning]
  );

  const next = useCallback(
    () => goTo(currentSlide + 1),
    [currentSlide, goTo]
  );
  const prev = useCallback(
    () => goTo(currentSlide - 1),
    [currentSlide, goTo]
  );

  const exit = useCallback(() => {
    router.push("/partner");
  }, [router]);

  // Keyboard handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
        case " ":
          e.preventDefault();
          next();
          break;
        case "ArrowLeft":
          e.preventDefault();
          prev();
          break;
        case "Escape":
          exit();
          break;
        case "f":
        case "F":
          if (!e.metaKey && !e.ctrlKey) {
            e.preventDefault();
            if (document.fullscreenElement) {
              document.exitFullscreen();
            } else {
              document.documentElement.requestFullscreen();
            }
          }
          break;
        case "?":
          setShowHelp((h) => !h);
          break;
        case "Home":
          e.preventDefault();
          goTo(0);
          break;
        case "End":
          e.preventDefault();
          goTo(slides.length - 1);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [next, prev, exit, goTo, slides.length]);

  // Touch support
  useEffect(() => {
    let startX = 0;
    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) next();
        else prev();
      }
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [next, prev]);

  const slide = slides[currentSlide];
  const SlideComponent = slide.component;

  return (
    <div className="fixed inset-0 z-[9999] bg-gray-900 flex flex-col select-none">
      <ProgressBar current={currentSlide} total={slides.length} />

      {/* Slide area */}
      <div className="flex-1 relative overflow-hidden">
        <div
          className={`absolute inset-0 transition-all duration-300 ease-out ${
            isTransitioning
              ? direction === "next"
                ? "opacity-0 translate-x-8"
                : "opacity-0 -translate-x-8"
              : "opacity-100 translate-x-0"
          }`}
        >
          <SlideComponent
            isActive={!isTransitioning}
            slideIndex={currentSlide}
            totalSlides={slides.length}
          />
        </div>
      </div>

      <SlideNavigator
        current={currentSlide}
        total={slides.length}
        onNavigate={goTo}
        onPrev={prev}
        onNext={next}
      />

      {/* Help overlay */}
      {showHelp && (
        <div
          className="absolute inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setShowHelp(false)}
        >
          <div className="bg-gray-800 rounded-xl p-8 max-w-md text-sm space-y-3">
            <h3 className="text-lg font-bold text-white mb-4">키보드 단축키</h3>
            <div className="grid grid-cols-2 gap-2 text-gray-300">
              <kbd className="bg-gray-700 px-2 py-1 rounded text-center">→ / Space</kbd>
              <span>다음 슬라이드</span>
              <kbd className="bg-gray-700 px-2 py-1 rounded text-center">←</kbd>
              <span>이전 슬라이드</span>
              <kbd className="bg-gray-700 px-2 py-1 rounded text-center">Home</kbd>
              <span>처음으로</span>
              <kbd className="bg-gray-700 px-2 py-1 rounded text-center">End</kbd>
              <span>마지막으로</span>
              <kbd className="bg-gray-700 px-2 py-1 rounded text-center">F</kbd>
              <span>풀스크린 토글</span>
              <kbd className="bg-gray-700 px-2 py-1 rounded text-center">ESC</kbd>
              <span>나가기</span>
              <kbd className="bg-gray-700 px-2 py-1 rounded text-center">?</kbd>
              <span>도움말 토글</span>
            </div>
            <p className="text-gray-500 text-xs mt-4 text-center">
              아무 곳이나 클릭하면 닫힙니다
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
