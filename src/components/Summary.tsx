import type { Shift } from "../types";

interface SummaryProps {
  shifts: Shift[];
}

function Summary({ shifts }: SummaryProps) {
    
  const totalEarnings = shifts.reduce((sum, shift) => sum + shift.earnings, 0);
  const totalHours = shifts.reduce((sum, shift) => sum + shift.hours, 0);
  const totalMiles = shifts.reduce((sum, shift) => sum + shift.miles, 0);

  const perHour = totalHours > 0 ? totalEarnings / totalHours : 0;
  const perMile = totalMiles > 0 ? totalEarnings / totalMiles : 0;

  const totalGas = shifts.reduce((sum, shift) => sum + shift.gas_cost, 0);
  const netProfit = totalEarnings - totalGas;
  const netPerHour = totalHours > 0 ? netProfit / totalHours : 0;
  return (
    <div className="summary">
        <div className="card">
        <span>Total Earned</span>
        <strong>${totalEarnings.toFixed(2)}</strong>
        </div>
        <div className="card">
        <span>Gas Cost</span>
        <strong className="negative">-${totalGas.toFixed(2)}</strong>
        </div>
        <div className="card highlight">
        <span>Net Profit</span>
        <strong>${netProfit.toFixed(2)}</strong>
        </div>
        <div className="card">
        <span>Gross / Hour</span>
        <strong>${perHour.toFixed(2)}</strong>
        </div>
        <div className="card highlight">
        <span>Net / Hour</span>
        <strong>${netPerHour.toFixed(2)}</strong>
        </div>
        <div className="card">
        <span>Hours / Miles</span>
        <strong>{totalHours} / {totalMiles}</strong>
        </div>
    </div>
    );
}

export default Summary;