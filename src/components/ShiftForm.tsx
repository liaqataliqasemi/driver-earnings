import { useState, type ChangeEvent, type FormEvent } from "react";
import type { Shift } from "../types";
import { inputClass, labelClass } from "../ui";

interface ShiftFormProps {
  onAdd: (shift: Omit<Shift, "id" | "gas_cost">) => void;
  editingShift: Shift | null;
  onCancel: () => void;
}

const emptyForm = {
  date: "",
  hours: "",
  miles: "",
  earnings: "",
};
 
function today() {
  return new Date().toLocaleDateString("en-CA");
}
function ShiftForm({ onAdd, editingShift, onCancel }: ShiftFormProps) {
  const [form, setForm] = useState(
    editingShift
        ? {
            date: editingShift.date,
            hours: String(editingShift.hours),
            miles: String(editingShift.miles),
            earnings: String(editingShift.earnings),
        }
        : { ...emptyForm, date: today() }
    );

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!form.hours || !form.earnings) {
      alert("Please enter hours and earnings");
      return;
    }

    onAdd({
      date: form.date || new Date().toLocaleDateString("en-CA"),
      hours: parseFloat(form.hours) || 0,
      miles: parseFloat(form.miles) || 0,
      earnings: parseFloat(form.earnings) || 0,
    });

    setForm({ ...emptyForm, date: today() });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-extrabold">
        {editingShift ? "Edit shift" : "Log a shift"}
      </h2>

      <label className={labelClass}>
        Date
        <input type="date" name="date" value={form.date}
          onChange={handleChange} className={inputClass} />
      </label>

      <div className="grid grid-cols-2 gap-3">
        <label className={labelClass}>
          Hours
          <input type="number" inputMode="decimal" step="0.1" min="0"
            name="hours" placeholder="4.5" value={form.hours}
            onChange={handleChange} className={inputClass} />
        </label>
        <label className={labelClass}>
          Miles
          <input type="number" inputMode="decimal" step="0.1" min="0"
            name="miles" placeholder="60" value={form.miles}
            onChange={handleChange} className={inputClass} />
        </label>
      </div>

      <label className={labelClass}>
        Earnings
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-gravel">
            $
          </span>
          <input type="number" inputMode="decimal" step="0.01" min="0"
            name="earnings" placeholder="85.00" value={form.earnings}
            onChange={handleChange} className={`${inputClass} pl-8`} />
        </div>
      </label>

      <button type="submit"
        className="w-full rounded-xl bg-sign py-4 text-lg font-bold text-white hover:bg-sign-dark active:scale-[0.99]">
        {editingShift ? "Save changes" : "Add shift"}
      </button>

      {editingShift && (
        <button type="button" onClick={onCancel}
          className="w-full py-3 font-semibold text-gravel">
          Cancel
        </button>
      )}
    </form>
  );
}

export default ShiftForm;