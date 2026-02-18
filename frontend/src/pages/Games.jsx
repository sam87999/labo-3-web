import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { gameService } from "../services/gameService";

export default function Games() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setError("");
    setLoading(true);
    try {
      const data = await gameService.list();
      setItems(data.listings ?? data);
    } catch (e) {
      setError(e?.response?.data?.error ?? "Erreur chargement listings");
    } finally {
      setLoading(false);
    }
  }

  async function onDelete(id) {
    if (!confirm("Supprimer ce game?")) return;
    try {
      await gameService.remove(id);
      load();
    } catch (e) {
      alert(e?.response?.data?.error ?? "Erreur delete");
    }
  }

  useEffect(() => { load(); }, []);

  return (
    <div style={{ padding: 24 }}>
      <h2>Games</h2>
      <Link to="/games/new">+ Nouveau</Link>

      {loading && <p>Chargement...</p>}
      {error && <p style={{ color: "crimson" }}>{error}</p>}

      <ul style={{ marginTop: 12 }}>
        {items.map((g) => (
          <li key={g.id} style={{ marginBottom: 8 }}>
            <b>{g.title ?? g.name ?? "Sans titre"}</b>{" "}
            <Link to={`/games/${g.id}/edit`}>Edit</Link>{" "}
            <button onClick={() => onDelete(g.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}