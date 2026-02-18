import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const createListingSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  conditionScore: z.number().int().min(1).max(10),
  price: z.number().int().positive().optional(),
  type: z.enum(["SELL", "TRADE", "BOTH"]),
  categoryId: z.string().min(1),
  photoUrls: z.array(z.string().url()).optional(),
});

export const updateListingSchema = createListingSchema.partial();
