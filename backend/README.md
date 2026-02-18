# GearSwap (Backend) — starter

Backend Express + TypeScript + Prisma (PostgreSQL Neon) pour une marketplace C2C de matériel sportif.

## Prérequis
- Node.js 18+
- Un projet Neon Postgres (DATABASE_URL)

## Installation
```bash
npm install
cp .env.example .env
# mettre DATABASE_URL dans .env
npx prisma generate
npx prisma migrate dev
npm run dev
```

## Endpoints (base)
- GET /api/health
- POST /api/auth/register
- POST /api/auth/login
- GET /api/listings
- GET /api/listings/:id
- POST /api/listings
- PATCH /api/listings/:id
- DELETE /api/listings/:id
- POST /api/transactions
- PATCH /api/transactions/:id/complete
- PATCH /api/transactions/:id/cancel

## Notes
- Auth simplifiée (pas de JWT) pour garder le starter clair.
- Pour le lab, tu peux ajouter un middleware auth plus tard si requis.
