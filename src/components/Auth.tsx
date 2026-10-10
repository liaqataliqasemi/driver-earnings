import { useState, type FormEvent } from "react";
import { supabase } from "../supabaseClient";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = isSignUp
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setMessage(
        isSignUp
            ? error.message
            : "Wrong email or password. New here? Click Sign up below."
        );
    } else {
      setMessage(isSignUp ? "Account created!" : "Logged in!");
    }
    setLoading(false);
  }

  return (
    <div className="card auth">
      <h2>{isSignUp ? "Create account" : "Sign in"}</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password (6+ characters)" value={password}
          onChange={(e) => setPassword(e.target.value)} required minLength={6} />
        <button type="submit" disabled={loading}>
          {loading ? "Please wait..." : isSignUp ? "Sign up" : "Sign in"}
        </button>
      </form>
      {message && <p className="message">{message}</p>}
      <button className="link" onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? "Already have an account? Sign in" : "No account? Sign up"}
      </button>
    </div>
  );
}

export default Auth;