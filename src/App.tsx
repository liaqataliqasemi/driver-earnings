interface Shift {
  date: string;
  hours: number;
  miles: number;
  earnings: number;
}

function App(){

  const appName: string = "Driver Earnings Tracker";
  const shifts: Shift[] = [
    {
      date: "2023-10-01",
      hours: 8,
      miles: 120,
      earnings: 120.00
    },
    {
      date: "2023-10-02",
      hours: 6,
      miles: 90,
      earnings: 90.00
    },
    {
      date: "2023-10-03",
      hours: 7,
      miles: 105,
      earnings: 105.00
    }
  ];

  const totalEarnings = shifts.reduce((sum, shift) => sum + shift.earnings, 0);
  return (
    <div>
      <h1>{appName}</h1>
      <p>Track my shifts and see my real pay.</p>
      <p><strong>Total Earnings: ${totalEarnings.toFixed(2)}</strong></p>
      <h2> My Shifts </h2>
      <ul>
        {shifts.map((shift) => (
          <li key={shift.date}>
            {shift.date}: {shift.hours} hours, {shift.miles} miles, ${shift.earnings.toFixed(2)}
          </li>
        )) }  
      </ul> 
    </div>
  );
}
export default App;