import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../prisma/client.js";
import { loginSchema, registerSchema } from "../models/validators.js";
import jwt from "jsonwebtoken";

export async function register(req: Request, res: Response) {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid body", details: parsed.error.flatten() });

  const { name, email, password } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return res.status(409).json({ error: "Email already used" });

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { name, email, password: passwordHash },
    select: { id: true, name: true, email: true, createdAt: true },
  });
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: "7d" });
res.status(201).json({ user, token });
}

export async function login(req: Request, res: Response) {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid body", details: parsed.error.flatten() });

  const { email, password } = parsed.data;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });

  const safeUser = { id: user.id, name: user.name, email: user.email };
const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: "7d" });
res.json({ user: safeUser, token });
}

export async function profile(req: Request, res: Response) {
  const userId = (req as any).userId as string;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true, createdAt: true },
  });

  if (!user) return res.status(404).json({ error: "User not found" });
  res.json({ user });
}