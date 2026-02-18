import type { Request, Response } from "express";
import { prisma } from "../prisma/client.js";
import { createListingSchema, updateListingSchema } from "../models/validators.js";



export async function listListings(req: Request, res: Response) {
  const { categoryId, minPrice, maxPrice, type, status } = req.query;

  const listings = await prisma.listing.findMany({
    where: {
      categoryId: typeof categoryId === "string" ? categoryId : undefined,
      type: typeof type === "string" ? (type as any) : undefined,
      status: typeof status === "string" ? (status as any) : "ACTIVE",
      price: {
        gte: typeof minPrice === "string" ? Number(minPrice) : undefined,
        lte: typeof maxPrice === "string" ? Number(maxPrice) : undefined,
      },
    },
    include: { photos: true, category: true, user: { select: { id: true, name: true } } },
    orderBy: { createdAt: "desc" },
  });

  res.json({ listings });
}

export async function getListing(req: Request, res: Response) {
  const { id } = req.params;

  const listing = await prisma.listing.findUnique({
    where: { id },
    include: { photos: true, category: true, user: { select: { id: true, name: true } } },
  });

  if (!listing) return res.status(404).json({ error: "Listing not found" });
  res.json({ listing });
}

export async function createListing(req: Request, res: Response) {
  const parsed = createListingSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid body", details: parsed.error.flatten() });

  const userId = (req.body?.userId as string | undefined) ?? "";
  if (!userId) return res.status(400).json({ error: "Missing userId (temporary for lab starter)" });

  const { title, description, conditionScore, price, type, categoryId, photoUrls } = parsed.data;

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      conditionScore,
      price: price ?? null,
      type,
      categoryId,
      userId,
      photos: photoUrls?.length ? { create: photoUrls.map((url) => ({ url })) } : undefined,
    },
    include: { photos: true },
  });

  res.status(201).json({ listing });
}

export async function updateListing(req: Request, res: Response) {
  const { id } = req.params;
  const parsed = updateListingSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid body", details: parsed.error.flatten() });

  const listing = await prisma.listing.update({
    where: { id },
    data: parsed.data,
  });

  res.json({ listing });
}

export async function archiveListing(req: Request, res: Response) {
  const { id } = req.params;

  const listing = await prisma.listing.update({
    where: { id },
    data: { status: "ARCHIVED" },
  });

  res.json({ listing });
}
