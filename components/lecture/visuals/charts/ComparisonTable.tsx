"use client";

interface Column {
  header: string;
  key: string;
  highlight?: boolean;
}

interface ComparisonTableProps {
  columns: Column[];
  rows: Record<string, React.ReactNode>[];
  className?: string;
}

export default function ComparisonTable({
  columns,
  rows,
  className = "",
}: ComparisonTableProps) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full text-sm">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-4 py-3 text-left font-semibold border-b border-gray-700 ${
                  col.highlight
                    ? "text-[#a855f7] bg-[#a855f7]/5"
                    : "text-gray-400"
                }`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={`px-4 py-3 ${
                    col.highlight ? "text-white font-medium" : "text-gray-300"
                  }`}
                >
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
