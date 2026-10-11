import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";
import type { Shift } from "../types";

interface BestDaysChartProps {
  shifts: Shift[];
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function BestDaysChart({ shifts }: BestDaysChartProps) {
  if (shifts.length === 0) return null;

  // 1. Add up net and hours for each weekday
  const totals = DAYS.map(() => ({ net: 0, hours: 0 }));
  for (const shift of shifts) {
    const dayIndex = new Date(shift.date + "T00:00").getDay();
    totals[dayIndex].net += shift.earnings - shift.gas_cost;
    totals[dayIndex].hours += shift.hours;
  }

  // 2. Net per hour for each day (Monday first)
  const order = [1, 2, 3, 4, 5, 6, 0];
  const data = order.map((i) => ({
    day: DAYS[i],
    perHour: totals[i].hours > 0
      ? Math.round((totals[i].net / totals[i].hours) * 100) / 100
      : 0,
  }));

  // 3. Find the best day
  const best = Math.max(...data.map((d) => d.perHour));
  const bestDay = data.find((d) => d.perHour === best && best > 0);

  return (
  <section className="mb-6 rounded-2xl bg-white p-4">
    <h2 className="text-lg font-extrabold">Best days to drive</h2>
    <p className="mb-3 text-sm text-gravel">
      {bestDay
        ? `${bestDay.day} pays best: $${bestDay.perHour.toFixed(2)}/hr net`
        : "Log a few shifts to see your best days."}
    </p>
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ left: -16 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E4E6E3" />
        <XAxis dataKey="day" tick={{ fill: "#6B7178", fontSize: 12 }}
          axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: "#6B7178", fontSize: 12 }} axisLine={false}
          tickLine={false} tickFormatter={(v) => `$${v}`} />
        <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}/hr`}
          cursor={{ fill: "#F3F4F2" }} />
        <Bar dataKey="perHour" radius={[6, 6, 0, 0]}>
          {data.map((d) => (
            <Cell key={d.day}
              fill={d.perHour === best && best > 0 ? "#F2B705" : "#C9CDC9"} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </section>
);
}

export default BestDaysChart;