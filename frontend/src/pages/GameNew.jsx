import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { gameService } from "../services/gameService";
import { useAuth } from "../context/AuthContext";

export default function GameNew() {
  const nav = useNavigate();
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [conditionScore, setConditionScore] = useState(8);
  const [price, setPrice] = useState("");
  const [type, setType] = useState("SELL");
  const [categoryId, setCategoryId] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      // backend starter requires userId in body (temporary)
      const payload = {
        userId: user?.id,
        title,
        description,
        conditionScore: Number(conditionScore),
        type,
        categoryId,
      };

      if (price !== "") payload.price = Number(price);
      if (photoUrl.trim() !== "") payload.photoUrls = [photoUrl.trim()];

      await gameService.create(payload);
      nav("/games");
    } catch (e2) {
      const msg =
        e2?.response?.data?.error ||
        (e2?.response?.data?.details ? JSON.stringify(e2.response.data.details) : "") ||
        "Erreur create";
      setError(msg);
    }
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>Nouveau listing</h2>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 8, maxWidth: 520 }}>
        <label>
          Titre (min 3)
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>

        <label>
          Description (min 10)
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />
        </label>

        <label>
          Condition (1 à 10)
          <input
            type="number"
            min="1"
            max="10"
            value={conditionScore}
            onChange={(e) => setConditionScore(e.target.value)}
          />
        </label>

        <label>
          Prix (optionnel)
          <input type="number" min="1" value={price} onChange={(e) => setPrice(e.target.value)} />
        </label>

        <label>
          Type
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="SELL">SELL</option>
            <option value="TRADE">TRADE</option>
            <option value="BOTH">BOTH</option>
          </select>
        </label>

        <label>
          CategoryId (obligatoire)
          <input value={categoryId} onChange={(e) => setCategoryId(e.target.value)} placeholder="ex: cat_xxx" />
        </label>

        <label>
          Photo URL (optionnel)
          <input value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} placeholder="https://..." />
        </label>

        <button type="submit">Créer</button>
      </form>

      {error && <p style={{ color: "crimson" }}>{error}</p>}

      <p>
        <Link to="/games">Retour</Link>
      </p>
    </div>
  );
}
