import { useState, type ChangeEvent, type FormEvent } from "react";
import type { Shift } from "../types";

interface ShiftFormProps {
  onAdd: (shift: Shift) => void;
}

const emptyForm = {
  date: "",
  hours: "",
  miles: "",
  earnings: "",
};

function ShiftForm({ onAdd }: ShiftFormProps) {
  const [form, setForm] = useState(emptyForm);

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
      id: Date.now(),
      date: form.date || new Date().toLocaleDateString("en-CA"),
      hours: parseFloat(form.hours) || 0,
      miles: parseFloat(form.miles) || 0,
      earnings: parseFloat(form.earnings) || 0,
    });

    setForm(emptyForm);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="date" name="date" value={form.date} onChange={handleChange} />
      <input type="number" name="hours" placeholder="Hours" value={form.hours} onChange={handleChange} />
      <input type="number" name="miles" placeholder="Miles" value={form.miles} onChange={handleChange} />
      <input type="number" name="earnings" placeholder="Earnings" value={form.earnings} onChange={handleChange} />
      <button type="submit">Add Shift</button>
    </form>
  );
}

export default ShiftForm;