import type { Shift } from "../types";
import { money } from "../format";
interface SummaryProps {
  shifts: Shift[];
}
 
interface RowProps {
  label: string;
  value: string;
  valueClass?: string;
}

function Row({ label, value, valueClass = "" }: RowProps) {
  return (
    <div className="flex items-center justify-between py-3">
      <dt className="text-gravel">{label}</dt>
      <dd className={`font-semibold ${valueClass}`}>{value}</dd>
    </div>
  );
}

function Summary({ shifts }: SummaryProps) {
  if (shifts.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-6 text-center">
        <p className="font-semibold">No shifts yet</p>
        <p className="mt-1 text-sm text-gravel">Tap + to log your first shift.</p>
      </div>
    );
  }

  const totalEarnings = shifts.reduce((sum, s) => sum + s.earnings, 0);
  const totalHours = shifts.reduce((sum, s) => sum + s.hours, 0);
  const totalMiles = shifts.reduce((sum, s) => sum + s.miles, 0);
  const totalGas = shifts.reduce((sum, s) => sum + s.gas_cost, 0);
  const netProfit = totalEarnings - totalGas;
  const perHour = totalHours > 0 ? totalEarnings / totalHours : 0;
  const netPerHour = totalHours > 0 ? netProfit / totalHours : 0;
  const hoursText = totalHours.toLocaleString("en-US", { maximumFractionDigits: 1 });

  return (
    <section>
      <div className="rounded-2xl bg-sign p-1.5 shadow-md">
        <div className="rounded-xl border-2 border-white px-5 py-6 text-white">
          <p className="text-sm font-semibold opacity-90">Net per hour</p>
          <p className="mt-1 text-6xl font-extrabold leading-none tracking-tight">
            {money.format(netPerHour)}
          </p>
          <p className="mt-3 text-sm opacity-90">
            {money.format(netProfit)} kept over {hoursText} hours
          </p>
        </div>
      </div>

      <dl className="mt-6 divide-y divide-black/10 rounded-2xl bg-white px-4">
        <Row label="Earned" value={money.format(totalEarnings)} />
        <Row label="Gas" value={`−${money.format(totalGas)}`} valueClass="text-brake" />
        <Row label="Gross per hour" value={money.format(perHour)} />
        <Row label="Miles driven" value={totalMiles.toLocaleString("en-US")} />
        <Row label="Shifts" value={String(shifts.length)} />
      </dl>
    </section>
  );
}

export default Summary;