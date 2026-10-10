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
    <div className="card chart">
      <h2>Net Earnings by Day</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
          <Bar dataKey="net" fill="#16a34a" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default EarningsChart;