import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../components/AuthContext";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
  };

  if (user) return <div>Déjà connecté.</div>;

  return (
    <form onSubmit={handleLogin} style={{ maxWidth: 320, margin: "auto", marginTop: 100 }}>
      <h2>Connexion Admin</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        required
        onChange={e => setEmail(e.target.value)}
        style={{ display: "block", width: "100%", marginBottom: 8 }}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        required
        onChange={e => setPassword(e.target.value)}
        style={{ display: "block", width: "100%", marginBottom: 8 }}
      />
      <button type="submit" style={{ width: "100%" }}>Se connecter</button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </form>
  );
} 