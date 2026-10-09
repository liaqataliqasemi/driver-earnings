interface Shift {
  date: string;
  hours: number;
  miles: number;
  earnings: number;
}

function App(){

  const appName: string = "Driver Earnings Tracker";
  const shift: Shift = {
    date: "2023-10-01",
    hours: 8,
    miles: 120,
    earnings: 120.00
  };

  return (
    <div>
      <h1>{appName}</h1>
      <p>Track my shifts and see my real pay.</p>
      <h2>Today's Shift</h2>
      <p>Date: {shift.date}</p>
      <p>Hours: {shift.hours}</p>
      <p>Miles: {shift.miles}</p>
      <p>Earnings: ${shift.earnings.toFixed(2)}</p>
      <p>Pay per Hour: ${ (shift.earnings / shift.hours).toFixed(2) }</p>
    </div>
  );
}
export default App;