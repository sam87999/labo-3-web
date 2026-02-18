import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await register(name, email, password);
      nav("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.error ?? "Erreur register");
    }
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>Register</h2>
      {error && <p style={{ color: "crimson" }}>{error}</p>}

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 8, maxWidth: 320 }}>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Créer un compte</button>
      </form>

      <p style={{ marginTop: 12 }}>
        Déjà un compte? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}