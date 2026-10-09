import { useState, useEffect } from "react";

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
  const [shifts, setShift] = useState<Shift[]>(() => {
  const saved = localStorage.getItem("shifts");
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState(emptyForm); 

  useEffect(() => {
    localStorage.setItem("shifts", JSON.stringify(shifts));
  }, [shifts]);

  const totalEarnings = shifts.reduce((sum, shift) => sum + shift.earnings, 0);
  const totalHours = shifts.reduce((sum, shift) => sum + shift.hours, 0);
  const totalMiles = shifts.reduce((sum, shift) => sum + shift.miles, 0);

  const perHour = totalHours > 0 ? totalEarnings / totalHours : 0;
  const perMile = totalMiles > 0 ? totalEarnings / totalMiles : 0;

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
      <p><strong>Total Hours: {totalHours.toFixed(2)}</strong></p>
      <p><strong>Total Miles: {totalMiles.toFixed(2)}</strong></p>
      <p><strong>Per Hour: ${perHour.toFixed(2)}</strong></p>
      <p><strong>Per Mile: ${perMile.toFixed(2)}</strong></p>
      <h2> My Shifts </h2>
      <ul>
        {shifts.map((shift) => (
          <li key={shift.id}>
            {shift.date}: {shift.hours} hours, {shift.miles} miles, ${shift.earnings.toFixed(2)}
            <button onClick={() => deleteShift(shift.id)}>Delete</button>
          </li>
        )) }  
      </ul> 
    </div>
  );
}
export default App;