import { z } from "zod";

const ReviewSchema = z
  .object({
    _id: z.string(),
    userId: z.string(),
    userName: z.string(),
    productId: z.string(),
    product: z.string(),
    productImage: z.string(),
    rating: z.number(),
    comment: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  })
  .partial();

export type ReviewType = z.infer<typeof ReviewSchema>;
