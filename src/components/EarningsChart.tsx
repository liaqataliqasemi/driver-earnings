import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import type { Shift } from "../types";

interface EarningsChartProps {
  shifts: Shift[];
}

function EarningsChart({ shifts }: EarningsChartProps) {
  if (shifts.length === 0) return null;

  // 1. Add up net earnings for each date
  const totalsByDate: Record<string, number> = {};
  for (const shift of shifts) {
    const net = shift.earnings - shift.gas_cost;
    totalsByDate[shift.date] = (totalsByDate[shift.date] ?? 0) + net;
  }

  // 2. Turn it into a sorted list for the chart (last 14 days)
  const data = Object.entries(totalsByDate)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-14)
    .map(([date, net]) => ({
      date: date.slice(5),
      net: Math.round(net * 100) / 100,
    }));

  return (
  <section className="mb-6 rounded-2xl bg-white p-4">
    <h2 className="mb-3 text-lg font-extrabold">Net by day</h2>
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ left: -16 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E4E6E3" />
        <XAxis dataKey="date" tick={{ fill: "#6B7178", fontSize: 12 }}
          axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: "#6B7178", fontSize: 12 }} axisLine={false}
          tickLine={false} tickFormatter={(v) => `$${v}`} />
        <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`}
          cursor={{ fill: "#F3F4F2" }} />
        <Bar dataKey="net" fill="#00704A" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </section>
);
}

export default EarningsChart;