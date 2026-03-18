"use client";

interface BarData {
  label: string;
  value: number;
  color?: string;
}

interface BarChartProps {
  data: BarData[];
  maxValue?: number;
  unit?: string;
  isActive: boolean;
  className?: string;
}

export default function BarChart({
  data,
  maxValue,
  unit = "",
  isActive,
  className = "",
}: BarChartProps) {
  const max = maxValue ?? Math.max(...data.map((d) => d.value));

  return (
    <div className={`space-y-3 ${className}`}>
      {data.map((item, i) => {
        const width = (item.value / max) * 100;
        return (
          <div key={i} className="flex items-center gap-3">
            <div className="w-24 text-right text-sm text-gray-400 shrink-0">
              {item.label}
            </div>
            <div className="flex-1 h-8 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-3"
                style={{
                  width: isActive ? `${width}%` : "0%",
                  background:
                    item.color ||
                    "linear-gradient(to right, #7B61FF, #38BDF8)",
                  transitionDelay: `${i * 150}ms`,
                }}
              >
                <span className="text-xs font-medium text-white whitespace-nowrap">
                  {item.value}
                  {unit}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
