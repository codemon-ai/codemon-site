"use client";

import { Children, isValidElement, ReactNode } from "react";

interface FadeInGroupProps {
  children: ReactNode;
  isActive: boolean;
  delay?: number;
  className?: string;
}

export default function FadeInGroup({
  children,
  isActive,
  delay = 200,
  className = "",
}: FadeInGroupProps) {
  return (
    <div className={className}>
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) return child;
        return (
          <div
            key={index}
            className="transition-all duration-500 ease-out"
            style={{
              opacity: isActive ? 1 : 0,
              transform: isActive ? "translateY(0)" : "translateY(16px)",
              transitionDelay: isActive ? `${index * delay}ms` : "0ms",
            }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
}
