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
        {shifts.map((shift) => (
          <li key={shift.id}>
            <div>
              <strong>{shift.date}</strong>
              <span>
                {shift.hours} hrs · {shift.miles} mi · ${(shift.earnings / shift.hours).toFixed(2)}/hr
              </span>
            </div>
            <div className="right">
              <strong>${shift.earnings.toFixed(2)}</strong>
              <button className="delete" onClick={() => onDelete(shift.id)}>✕</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShiftList;