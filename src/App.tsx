import { useState, useEffect } from "react";
import type { Session } from "@supabase/supabase-js";
import type { Shift } from "./types";
import { supabase } from "./supabaseClient";
import Auth from "./components/Auth";
import Summary from "./components/Summary";
import ShiftList from "./components/ShiftList";
import ShiftForm from "./components/ShiftForm";

function App() {
  const appName: string = "Driver Earnings Tracker";

  // Who is logged in (null = nobody)
  const [session, setSession] = useState<Session | null>(null);

  // The user's shifts, loaded from Supabase
  const [shifts, setShift] = useState<Shift[]>([]);

  // Check login on start, and listen for sign in / sign out
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Load shifts from the database when someone logs in
  useEffect(() => {
    if (!session) return;

    async function loadShifts() {
      const { data, error } = await supabase
        .from("shifts")
        .select("*")
        .order("date", { ascending: false });

      if (error) {
        console.error("Load error:", error.message);
        return;
      }
      setShift(data);
    }

    loadShifts();
  }, [session]);

  async function addShift(newShift: Omit<Shift, "id">) {
    const { data, error } = await supabase
      .from("shifts")
      .insert(newShift)
      .select()
      .single();

    if (error) {
      alert("Could not save: " + error.message);
      return;
    }
    setShift([data, ...shifts]);
  }

  async function deleteShift(id: number) {
    const { error } = await supabase
      .from("shifts")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Could not delete: " + error.message);
      return;
    }
    setShift(shifts.filter((shift) => shift.id !== id));
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  // Not logged in: show the login form
  if (!session) {
    return (
      <div className="container">
        <h1>{appName}</h1>
        <p className="subtitle">Track my shifts and see my real pay.</p>
        <Auth />
      </div>
    );
  }

  // Logged in: show the app
  return (
    <div className="container">
      <div className="header">
        <h1>{appName}</h1>
        <button className="link" onClick={signOut}>Sign out</button>
      </div>
      <p className="subtitle">Logged in as {session.user.email}</p>
      <ShiftForm onAdd={addShift} />
      <Summary shifts={shifts} />
      <ShiftList shifts={shifts} onDelete={deleteShift} />
    </div>
  );
}

export default App;