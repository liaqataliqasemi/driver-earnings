import { useState } from "react";


interface Shift {
  id: number;
  date: string;
  hours: number;
  miles: number;
  earnings: number;
}

const emptyForm = {
  date: "",
  hours: "",
  miles: "",
  earnings: ""
};

function App(){

  const appName: string = "Driver Earnings Tracker";
  const [shifts, setShift] = useState<Shift[]>([
    {
      id: 1,
      date: "2023-10-01",
      hours: 8,
      miles: 120,
      earnings: 120.00
    },
    {
      id: 2,
      date: "2023-10-02",
      hours: 6,
      miles: 90,
      earnings: 90.00
    },
    {
      id: 3,
      date: "2023-10-03",
      hours: 7,
      miles: 105,
      earnings: 105.00
    }
  ]);
  const [form, setForm] = useState(emptyForm); 

  const totalEarnings = shifts.reduce((sum, shift) => sum + shift.earnings, 0);
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

  return (
    <div>
      <h1>{appName}</h1>
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
      <p><strong>Total Earnings: ${totalEarnings.toFixed(2)}</strong></p>
      <h2> My Shifts </h2>
      <ul>
        {shifts.map((shift) => (
          <li key={shift.id}>
            {shift.date}: {shift.hours} hours, {shift.miles} miles, ${shift.earnings.toFixed(2)}
          </li>
        )) }  
      </ul> 
    </div>
  );
}
export default App;