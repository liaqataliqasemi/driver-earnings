import { useState, useEffect } from "react";
import type { Session } from "@supabase/supabase-js";
import type { Shift, Settings, Tab } from "./types"; 
import { supabase } from "./supabaseClient";
import Auth from "./components/Auth";
import Summary from "./components/Summary";
import ShiftList from "./components/ShiftList";
import ShiftForm from "./components/ShiftForm"; 
import SettingsForm from "./components/SettingsForm";
import EarningsChart from "./components/EarningsChart";
import BestDaysChart from "./components/BestDaysChart";
import BottomNav from "./components/BottomNav";

function App() {
  const appName: string = "Driver Earnings Tracker";

  // Who is logged in (null = nobody)
  const [session, setSession] = useState<Session | null>(null);

  // The user's shifts, loaded from Supabase
  const [shifts, setShift] = useState<Shift[]>([]);

  // The user's settings, loaded from Supabase
  const [settings, setSettings] = useState<Settings>({ mpg: 25, gas_price: 4.5 });

  // The shift being edited (null = not editing)
  const [editingShift, setEditingShift] = useState<Shift | null>(null);
  
  const [tab, setTab] = useState<Tab>("home");
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

  function startEdit(shift: Shift) {
    setEditingShift(shift);
    setTab("add");
  }

  function cancelEdit() {
    setEditingShift(null);
    setTab("shifts");
  }

  function calculateGasCost(miles: number) {
    if (settings.mpg <= 0) return 0;
    const cost = (miles / settings.mpg) * settings.gas_price;
    return Math.round(cost * 100) / 100;
  }
  async function addShift(newShift: Omit<Shift, "id" | "gas_cost">) {
     
    const { data, error } = await supabase
      .from("shifts")
      .insert({ ...newShift, gas_cost: calculateGasCost(newShift.miles) })
      .select()
      .single();

    if (error) {
      alert("Could not save: " + error.message);
      return;
    }
    setShift([data, ...shifts]);
  }

  async function updateShift(changes: Omit<Shift, "id" | "gas_cost">) {
    if (!editingShift) return;

    const { data, error } = await supabase
      .from("shifts")
      .update({ ...changes, gas_cost: calculateGasCost(changes.miles) })
      .eq("id", editingShift.id)
      .select()
      .single();

    if (error) {
      alert("Could not update: " + error.message);
      return;
    }

    setShift(shifts.map((shift) => (shift.id === data.id ? data : shift)));
    setEditingShift(null);
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

  async function saveSettings(newSettings: Settings) {
    if (!session) return;

    const { error } = await supabase
      .from("settings")
      .upsert({ user_id: session.user.id, ...newSettings });

    if (error) {
      alert("Could not save settings: " + error.message);
      return;
    }
    setSettings(newSettings);
    alert("Settings saved!");
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  useEffect(() => {
  if (!session) return;

  async function loadSettings() {
      const { data, error } = await supabase
        .from("settings")
        .select("mpg, gas_price")
        .maybeSingle();

      if (error) {
        console.error("Settings error:", error.message);
        return;
      }
      if (data) {
        setSettings(data);
      }
    }

    loadSettings();
  }, [session]);

  // Not logged in: show the login form
   if (!session) {
  return (
      <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center px-4 py-10">
        <div className="mb-8 rounded-2xl bg-sign p-1.5 shadow-md">
          <div className="rounded-xl border-2 border-white px-5 py-6 text-white">
            <h1 className="text-3xl font-extrabold leading-tight">Driver Earnings</h1>
            <p className="mt-2 opacity-90">See what you really make per hour, after gas.</p>
          </div>
        </div>
        <Auth />
      </main>
    );
  }

  // Logged in: show the app
  return (
  <>
    <main className="mx-auto max-w-md px-4 pb-28 pt-6">
      <h1 className="mb-6 text-2xl font-extrabold text-sign">{appName}</h1>

      {tab === "home" && <Summary shifts={shifts} />}

      {tab === "shifts" && (
        <ShiftList shifts={shifts} onDelete={deleteShift} onEdit={startEdit} />
      )}

      
      {tab === "add" && (
        <>
          <ShiftForm
            key={editingShift?.id ?? "new"}
            onAdd={editingShift ? updateShift : addShift}
            editingShift={editingShift}
            onCancel={cancelEdit}
          />
          <SettingsForm
            key={`${settings.mpg}-${settings.gas_price}`}
            settings={settings}
            onSave={saveSettings}
          />
        </>
      )}

      {tab === "charts" && (
        <>
          <BestDaysChart shifts={shifts} />
          <EarningsChart shifts={shifts} />
        </>
      )}

      {tab === "settings" && (
        <section className="rounded-2xl bg-white p-4">
          <h2 className="text-lg font-extrabold">Account</h2>
          <p className="mt-1 text-sm text-gravel">Signed in as {session.user.email}</p>
          <button onClick={signOut}
            className="mt-4 w-full rounded-xl border-2 border-brake py-3 font-bold text-brake hover:bg-brake hover:text-white">
            Sign out
          </button>
        </section>
      )}
    </main>

    <BottomNav active={tab} onChange={setTab} />
  </>
);
}

export default App;