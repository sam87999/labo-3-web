import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: 24 }}>
      <h2>Dashboard (protégé)</h2>

      <p>Bienvenue {user?.name} 👋</p>

      <p>
        <Link to="/games">Aller aux games</Link>
      </p>

      <button onClick={logout}>Logout</button>
    </div>
  );
}