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
  return (
    <div className="summary">
        <div className="card">
        <span>Total Earned</span>
        <strong>${totalEarnings.toFixed(2)}</strong>
        </div>
        <div className="card">
        <span>Per Hour</span>
        <strong>${perHour.toFixed(2)}</strong>
        </div>
        <div className="card">
        <span>Per Mile</span>
        <strong>${perMile.toFixed(2)}</strong>
        </div>
        <div className="card">
        <span>Hours / Miles</span>
        <strong>{totalHours} / {totalMiles}</strong>
        </div>
    </div>
   );
}

export default Summary;