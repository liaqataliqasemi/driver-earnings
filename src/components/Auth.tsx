import { useState, type FormEvent } from "react";
import { supabase } from "../supabaseClient";
import { inputClass, labelClass } from "../ui";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = isSignUp
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setIsError(true);
      setMessage(
        isSignUp ? error.message : "Wrong email or password. New here? Create an account below."
      );
    } else {
      setIsError(false);
      setMessage(isSignUp ? "Account created." : "");
    }
    setLoading(false);
  }

  return (
    <section className="rounded-2xl bg-white p-5">
      <h2 className="mb-4 text-xl font-extrabold">
        {isSignUp ? "Create your account" : "Sign in"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className={labelClass}>
          Email
          <input type="email" autoComplete="email" required
            value={email} onChange={(e) => setEmail(e.target.value)}
            className={inputClass} />
        </label>
        <label className={labelClass}>
          Password
          <input type="password" required minLength={6}
            autoComplete={isSignUp ? "new-password" : "current-password"}
            value={password} onChange={(e) => setPassword(e.target.value)}
            className={inputClass} />
        </label>

        {message && (
          <p role="alert" className={`text-sm font-semibold ${isError ? "text-brake" : "text-sign"}`}>
            {message}
          </p>
        )}

        <button type="submit" disabled={loading}
          className="w-full rounded-xl bg-sign py-4 text-lg font-bold text-white hover:bg-sign-dark disabled:opacity-60">
          {loading ? "Please wait..." : isSignUp ? "Create account" : "Sign in"}
        </button>
      </form>

      <button type="button" onClick={() => { setIsSignUp(!isSignUp); setMessage(""); }}
        className="mt-4 w-full text-sm font-semibold text-sign">
        {isSignUp ? "Already have an account? Sign in" : "New here? Create an account"}
      </button>
    </section>
);
}

export default Auth;