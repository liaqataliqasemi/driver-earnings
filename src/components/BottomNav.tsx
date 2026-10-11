import { House, List, Plus, ChartColumn, Settings as SettingsIcon } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Tab } from "../types";

interface BottomNavProps {
  active: Tab;
  onChange: (tab: Tab) => void;
}

const tabs: { id: Tab; label: string; icon: LucideIcon }[] = [
  { id: "home", label: "Home", icon: House },
  { id: "shifts", label: "Shifts", icon: List },
  { id: "add", label: "Add", icon: Plus },
  { id: "charts", label: "Charts", icon: ChartColumn },
  { id: "settings", label: "Settings", icon: SettingsIcon },
];

function BottomNav({ active, onChange }: BottomNavProps) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-10 border-t border-black/10 bg-white pb-[env(safe-area-inset-bottom)]">
      <ul className="mx-auto flex max-w-md items-end justify-around">
        {tabs.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;

          if (id === "add") {
            return (
              <li key={id}>
                <button
                  aria-label="Add shift"
                  onClick={() => onChange(id)}
                  className="-mt-6 mb-2 grid size-14 place-items-center rounded-full bg-sign text-white shadow-lg ring-4 ring-concrete hover:bg-sign-dark"
                >
                  <Icon size={28} strokeWidth={2.5} />
                </button>
              </li>
            );
          }

          return (
            <li key={id}>
              <button
                onClick={() => onChange(id)}
                aria-current={isActive ? "page" : undefined}
                className={`flex flex-col items-center gap-0.5 px-3 py-2 text-xs ${
                  isActive ? "font-semibold text-sign" : "text-gravel"
                }`}
              >
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                {label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default BottomNav;