import type { Shift } from "../types";

interface ShiftListProps {
  shifts: Shift[];
  onDelete: (id: number) => void;
}

 function ShiftList({ shifts, onDelete }: ShiftListProps) {
  if (shifts.length === 0) {
    return <p className="empty">No shifts yet. Add your first one!</p>;
  }

  return (
    <div className="card">
      <h2>My Shifts</h2>
      <ul className="shift-list">
        {shifts.map((shift) => {
            const net = shift.earnings - shift.gas_cost;
            const netPerHour = shift.hours > 0 ? net / shift.hours : 0;

            return (
                <li key={shift.id}>
                <div>
                    <strong>{shift.date}</strong>
                    <span>
                    {shift.hours} hrs · {shift.miles} mi · gas ${shift.gas_cost.toFixed(2)}
                    </span>
                    <span className="net">Net ${netPerHour.toFixed(2)}/hr</span>
                </div>
                <div className="right">
                    <div className="amounts">
                    <strong>${net.toFixed(2)}</strong>
                    <span>of ${shift.earnings.toFixed(2)}</span>
                    </div>
                    <button className="delete" onClick={() => onDelete(shift.id)}>✕</button>
                </div>
                </li>
            );
            })}
      </ul>
    </div>
  );
}

export default ShiftList;