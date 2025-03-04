import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.number().nonnegative("Price must be a non-negative number"),
  storeId: z.number().int().positive("Valid store ID is required"),
  imageUrl: z.string().optional(),
});
