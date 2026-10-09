import type { Shift } from "../types";

interface ShiftListProps {
  shifts: Shift[];
  onDelete: (id: number) => void;
}

function ShiftList({ shifts, onDelete }: ShiftListProps) {
  return (
    <div>
      <h2>My Shifts</h2>
      <ul>
        {shifts.map((shift) => (
          <li key={shift.id}>
            {shift.date}: {shift.hours} hours, {shift.miles} miles, ${shift.earnings.toFixed(2)}
            <button onClick={() => onDelete(shift.id)}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShiftList;