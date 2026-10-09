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
    <div> 
      <p><strong>Total Earnings: ${totalEarnings.toFixed(2)}</strong></p>
      <p><strong>Total Hours: {totalHours.toFixed(2)}</strong></p>
      <p><strong>Total Miles: {totalMiles.toFixed(2)}</strong></p>
      <p><strong>Per Hour: ${perHour.toFixed(2)}</strong></p>
      <p><strong>Per Mile: ${perMile.toFixed(2)}</strong></p>
    </div>
  );
}

export default Summary;