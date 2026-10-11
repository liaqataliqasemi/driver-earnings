import type { Shift } from "../types";
import { Pencil, Trash2 } from "lucide-react";
import { money, formatDate } from "../format";


interface ShiftListProps {
  shifts: Shift[];
  onDelete: (id: number) => void;
  onEdit: (shift: Shift) => void;
}

 function ShiftList({ shifts, onDelete, onEdit }: ShiftListProps) {
  if (shifts.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-6 text-center">
        <p className="font-semibold">No shifts yet</p>
        <p className="mt-1 text-sm text-gravel">Tap + to log your first shift.</p>
      </div>
    );
  }

  function handleDelete(shift: Shift) {
    if (window.confirm(`Delete the shift on ${formatDate(shift.date)}?`)) {
      onDelete(shift.id);
    }
  }

  return (
    <section>
      <h2 className="mb-3 text-xl font-extrabold">Shifts</h2>
      <ul className="divide-y divide-black/10 rounded-2xl bg-white">
        {shifts.map((shift) => {
          const net = shift.earnings - shift.gas_cost;
          const netPerHour = shift.hours > 0 ? net / shift.hours : 0;

          return (
            <li key={shift.id} className="flex items-center gap-3 px-4 py-3">
              <div className="min-w-0 flex-1">
                <p className="font-semibold">{formatDate(shift.date)}</p>
                <p className="text-sm text-gravel">
                  {shift.hours} hrs, {shift.miles} mi, gas {money.format(shift.gas_cost)}
                </p>
                <p className="text-sm font-semibold text-sign">
                  {money.format(netPerHour)}/hr net
                </p>
              </div>

              <div className="text-right">
                <p className="text-lg font-bold">{money.format(net)}</p>
                <p className="text-xs text-gravel">of {money.format(shift.earnings)}</p>
              </div>

              <div className="flex flex-col gap-1">
                <button
                  aria-label={`Edit shift on ${formatDate(shift.date)}`}
                  onClick={() => onEdit(shift)}
                  className="rounded-lg p-2 text-gravel hover:bg-concrete hover:text-asphalt"
                >
                  <Pencil size={18} />
                </button>
                <button
                  aria-label={`Delete shift on ${formatDate(shift.date)}`}
                  onClick={() => handleDelete(shift)}
                  className="rounded-lg p-2 text-gravel hover:bg-red-50 hover:text-brake"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default ShiftList;