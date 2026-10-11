import { useState, type FormEvent } from "react";
import { Fuel } from "lucide-react";
import type { Settings } from "../types";
import { money } from "../format";
import { inputClass, labelClass } from "../ui";

interface SettingsFormProps {
  settings: Settings;
  onSave: (settings: Settings) => void;
}

function SettingsForm({ settings, onSave }: SettingsFormProps) {
  const [mpg, setMpg] = useState(String(settings.mpg));
  const [gasPrice, setGasPrice] = useState(String(settings.gas_price));

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const mpgNumber = parseFloat(mpg);
    const priceNumber = parseFloat(gasPrice);

    if (!mpgNumber || mpgNumber <= 0 || !priceNumber || priceNumber <= 0) {
      alert("Enter an MPG and gas price above 0.");
      return;
    }
    onSave({ mpg: mpgNumber, gas_price: priceNumber });
  }

  return (
    <details className="mt-6 rounded-2xl bg-white">
      <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 [&::-webkit-details-marker]:hidden">
        <span className="flex items-center gap-2 font-semibold">
          <Fuel size={18} className="text-sign" />
          Gas: {settings.mpg} MPG, {money.format(settings.gas_price)}/gal
        </span>
        <span className="text-sm font-semibold text-sign">Change</span>
      </summary>

      <form onSubmit={handleSubmit} className="space-y-4 border-t border-black/10 p-4">
        <div className="grid grid-cols-2 gap-3">
          <label className={labelClass}>
            Car MPG
            <input type="number" inputMode="decimal" step="0.1" min="0"
              value={mpg} onChange={(e) => setMpg(e.target.value)}
              className={inputClass} />
          </label>
          <label className={labelClass}>
            Gas $/gal
            <input type="number" inputMode="decimal" step="0.01" min="0"
              value={gasPrice} onChange={(e) => setGasPrice(e.target.value)}
              className={inputClass} />
          </label>
        </div>
        <button type="submit"
          className="w-full rounded-xl border-2 border-sign py-3 font-bold text-sign hover:bg-sign hover:text-white">
          Save gas settings
        </button>
        <p className="text-xs text-gravel">
          Applies to new shifts. Past shifts keep their gas cost.
        </p>
      </form>
    </details>
  );
}

export default SettingsForm;