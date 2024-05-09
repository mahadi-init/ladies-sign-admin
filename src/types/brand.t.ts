import { z } from "zod";

export const BrandSchema = z
  .object({
    _id: z.string(),
    name: z.string().min(3, "Name is too short"),
    img: z.string().url(),
    email: z.union([z.string().email().nullish(), z.literal("")]),
    location: z.union([z.string().nullish(), z.literal("")]),
    status: z.boolean(),
    //FIXME: Change this with the actual products
    products: z.array(z.any()),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  })
  .partial();

export type BrandType = z.infer<typeof BrandSchema>;
