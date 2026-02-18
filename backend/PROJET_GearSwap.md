# PROJET – GearSwap  
Laboratoire 2 – Modélisation & Backend (Node/Express/TS + Neon Postgres)

## Résumé
GearSwap est une plateforme C2C où des utilisateurs peuvent publier des annonces de matériel sportif usagé (vente / échange).  
Le backend expose une API REST permettant de gérer utilisateurs, catégories, annonces, photos et transactions.

## Modèle de données (résumé)
- User (1) — (N) Listing  
- Category (1) — (N) Listing  
- Listing (1) — (N) ListingPhoto  
- Listing (0..1) — (1) Transaction  

## Choix techniques
- Express + TypeScript (strict)
- Prisma ORM + Neon Postgres
- Architecture MVC: routes → controllers → prisma

## À faire (si tu veux pousser plus loin)
- Ajouter JWT + middleware auth
- Ajouter endpoint categories (CRUD)
- Ajouter validations plus strictes et pagination
