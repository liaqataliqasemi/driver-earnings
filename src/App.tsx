import { useState, useEffect } from "react";
import type { Shift } from "./types";
import Summary from "./components/Summary";
import ShiftList from "./components/ShiftList";
import ShiftForm from "./components/ShiftForm";

 

function App(){

  const appName: string = "Driver Earnings Tracker";
  const [shifts, setShift] = useState<Shift[]>(() => {
  const saved = localStorage.getItem("shifts");
    return saved ? JSON.parse(saved) : [];
  });
 

  useEffect(() => {
    localStorage.setItem("shifts", JSON.stringify(shifts));
  }, [shifts]);

  function addShift(newShift: Shift) {        // 👈 here
    setShift([...shifts, newShift]);
  }

  function deleteShift(id: number) {
    setShift(shifts.filter((shift) => shift.id !== id));
  }

  return (
    <div className="container">
      <h1>{appName}</h1>
      <p className="subtitle">Track my shifts and see my real pay.</p>
      <ShiftForm onAdd={addShift} />
      <Summary shifts={shifts} />
      <ShiftList shifts={shifts} onDelete={deleteShift} />
    </div>
  );
}
export default App;