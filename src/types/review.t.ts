import { z } from "zod";

const ReviewSchema = z
  .object({
    _id: z.string(),
    name: z.string(),
    product: z.object({
      _id: z.string(),
      name: z.string(),
      img: z.string(),
    }),
    rating: z.number(),
    comment: z.string(),
    approved: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
  })
  .partial();

export type ReviewType = z.infer<typeof ReviewSchema>;
