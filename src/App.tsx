import { useState, useEffect } from "react";
import type { Shift } from "./types";
import Summary from "./components/Summary";
import ShiftList from "./components/ShiftList";

const emptyForm = {
  date: "",
  hours: "",
  miles: "",
  earnings: ""
};

function App(){

  const appName: string = "Driver Earnings Tracker";
  const [shifts, setShift] = useState<Shift[]>(() => {
  const saved = localStorage.getItem("shifts");
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState(emptyForm); 

  useEffect(() => {
    localStorage.setItem("shifts", JSON.stringify(shifts));
  }, [shifts]);


  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
  setForm({ ...form, [e.target.name]: e.target.value });
}

  function addShift(){
    if (!form.hours || !form.earnings) {
      alert("please enter hours and earnings");
      return;
    }
    const newShift: Shift = {
      id: Date.now(), 
      date: form.date || new Date().toLocaleDateString("en-CA"),
      hours: parseFloat(form.hours) || 0,
      miles: parseFloat(form.miles) || 0,
      earnings: parseFloat(form.earnings) || 0,
    };
    setShift([...shifts, newShift]);
    setForm(emptyForm);
  }

  function deleteShift(id: number) {
    setShift(shifts.filter((shift) => shift.id !== id));
  }

  return (
    <div>
      <h1>{appName}</h1>
      <Summary shifts={shifts} />
      <input
        type="date"
        placeholder="Date"
        name="date"
        value={form.date}
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Hours"
        name="hours"
        value={form.hours}
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Miles"
        name="miles"
        value={form.miles}
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Earnings"
        name="earnings"
        value={form.earnings}
        onChange={handleChange}
      />
      <button onClick={addShift}>Add Shift</button>

      <p> You Typed: {form.hours} hours</p>
      <p>Track my shifts and see my real pay.</p>   
      <ShiftList shifts={shifts} onDelete={deleteShift} />
    </div>
  );
}
export default App;