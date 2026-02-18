import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      nav("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.error ?? "Erreur login");
    }
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>Login</h2>
      {error && <p style={{ color: "crimson" }}>{error}</p>}

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 8, maxWidth: 320 }}>
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Se connecter</button>
      </form>

      <p style={{ marginTop: 12 }}>
        Pas de compte? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}