import type { Request, Response } from "express";
import { prisma } from "../prisma/client.js";

export async function createTransaction(req: Request, res: Response) {
  const { listingId, buyerId } = req.body as { listingId?: string; buyerId?: string };
  if (!listingId || !buyerId) return res.status(400).json({ error: "listingId and buyerId required" });

  const listing = await prisma.listing.findUnique({ where: { id: listingId } });
  if (!listing) return res.status(404).json({ error: "Listing not found" });
  if (listing.status !== "ACTIVE") return res.status(409).json({ error: "Listing not available" });

  if (!listing.price) return res.status(400).json({ error: "Listing has no price (trade-only). Handle trade flow if needed." });

  const tx = await prisma.transaction.create({
    data: {
      listingId,
      buyerId,
      sellerId: listing.userId,
      amount: listing.price,
      status: "PENDING",
    },
  });

  await prisma.listing.update({ where: { id: listingId }, data: { status: "RESERVED" } });

  res.status(201).json({ transaction: tx });
}

export async function completeTransaction(req: Request, res: Response) {
  const { id } = req.params;

  const tx = await prisma.transaction.update({
    where: { id },
    data: { status: "COMPLETED" },
  });

  await prisma.listing.update({ where: { id: tx.listingId }, data: { status: "SOLD" } });

  res.json({ transaction: tx });
}

export async function cancelTransaction(req: Request, res: Response) {
  const { id } = req.params;

  const tx = await prisma.transaction.update({
    where: { id },
    data: { status: "CANCELLED" },
  });

  await prisma.listing.update({ where: { id: tx.listingId }, data: { status: "ACTIVE" } });

  res.json({ transaction: tx });
}
