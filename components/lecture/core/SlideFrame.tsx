"use client";

import { SECTION_TITLES } from "./types";

interface SlideFrameProps {
  children: React.ReactNode;
  section: number;
  slideIndex: number;
  totalSlides: number;
}

export default function SlideFrame({
  children,
  section,
  slideIndex,
  totalSlides,
}: SlideFrameProps) {
  const sectionTitle = SECTION_TITLES[section];

  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-900 p-4 sm:p-8">
      <div
        className="relative w-full h-full max-w-[1280px] max-h-[720px] rounded-2xl overflow-hidden"
        style={{ aspectRatio: "16/9" }}
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800" />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(123,97,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(123,97,255,0.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Content */}
        <div className="relative z-[1] w-full h-full flex flex-col px-8 sm:px-12 py-6 sm:py-8">
          {/* Section title */}
          {sectionTitle && (
            <div className="mb-2 text-xs sm:text-sm font-medium tracking-wider uppercase text-[#a855f7]">
              Section {section} — {sectionTitle}
            </div>
          )}

          {/* Slide content */}
          <div className="flex-1 flex flex-col justify-center min-h-0">
            {children}
          </div>
        </div>

        {/* Slide number */}
        <div className="absolute bottom-3 right-4 text-xs text-gray-600 z-[2]">
          {slideIndex + 1} / {totalSlides}
        </div>
      </div>
    </div>
  );
}
