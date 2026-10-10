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

  return (
    <div className="card chart">
      <h2>Best Days to Drive (net $/hr)</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}/hr`} />
          <Bar dataKey="perHour" radius={[6, 6, 0, 0]}>
            {data.map((d) => (
              <Cell
                key={d.day}
                fill={d.perHour === best && best > 0 ? "#16a34a" : "#94a3b8"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BestDaysChart;