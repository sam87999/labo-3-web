import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: 24 }}>
      <h1>GearSwap</h1>

      {user ? (
        <>
          <p>Connecté: {user.name} ({user.email})</p>
          <button onClick={logout}>Logout</button>
          <div style={{ marginTop: 12 }}>
            <Link to="/dashboard">Dashboard</Link>
          </div>
        </>
      ) : (
        <div style={{ marginTop: 12 }}>
          <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
        </div>
      )}
    </div>
  );
}