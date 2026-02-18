import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { gameService } from "../services/gameService";

export default function GameEdit() {
  const { id } = useParams();
  const nav = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [conditionScore, setConditionScore] = useState(8);
  const [price, setPrice] = useState("");
  const [type, setType] = useState("SELL");
  const [categoryId, setCategoryId] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setError("");
      try {
        const data = await gameService.get(id);
        const l = data.listing ?? data;

        setTitle(l.title ?? "");
        setDescription(l.description ?? "");
        setConditionScore(l.conditionScore ?? 8);
        setPrice(l.price ?? "");
        setType(l.type ?? "SELL");
        setCategoryId(l.categoryId ?? "");
        setPhotoUrl(l.photos?.[0]?.url ?? "");
      } catch (e) {
        setError(e?.response?.data?.error ?? "Erreur load listing");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const payload = {
        title,
        description,
        conditionScore: Number(conditionScore),
        type,
        categoryId,
      };

      if (price !== "") payload.price = Number(price);
      if (photoUrl.trim() !== "") payload.photoUrls = [photoUrl.trim()];

      await gameService.update(id, payload);
      nav("/games");
    } catch (e2) {
      const msg =
        e2?.response?.data?.error ||
        (e2?.response?.data?.details ? JSON.stringify(e2.response.data.details) : "") ||
        "Erreur update";
      setError(msg);
    }
  }

  if (loading) return <div style={{ padding: 24 }}>Chargement...</div>;

  return (
    <div style={{ padding: 24 }}>
      <h2>Modifier listing</h2>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 8, maxWidth: 520 }}>
        <label>
          Titre
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>

        <label>
          Description
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
          CategoryId
          <input value={categoryId} onChange={(e) => setCategoryId(e.target.value)} />
        </label>

        <label>
          Photo URL (optionnel)
          <input value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} placeholder="https://..." />
        </label>

        <button type="submit">Sauver</button>
      </form>

      {error && <p style={{ color: "crimson" }}>{error}</p>}

      <p>
        <Link to="/games">Retour</Link>
      </p>
    </div>
  );
}
