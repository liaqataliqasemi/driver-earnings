import { useState, type FormEvent } from "react";
import type { Settings } from "../types";

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
      alert("Please enter a valid MPG and gas price");
      return;
    }

    onSave({ mpg: mpgNumber, gas_price: priceNumber });
  }

  return (
    <form className="card settings" onSubmit={handleSubmit}>
      <label>
        Car MPG
        <input type="number" step="0.1" value={mpg}
          onChange={(e) => setMpg(e.target.value)} />
      </label>
      <label>
        Gas price ($/gal)
        <input type="number" step="0.01" value={gasPrice}
          onChange={(e) => setGasPrice(e.target.value)} />
      </label>
      <button type="submit">Save settings</button>
    </form>
  );
}

export default SettingsForm;