import { z } from "zod";

export const ProductSchema = z
  .object({
    _id: z.string(),
    name: z.string().min(3, "Name is too short"),
    sku: z.string().min(3, "SKU is too short"),
    description: z.string(),
    discount: z.number(),
    videoId: z.string(),
    reviews: z.array(z.string()),
    variants: z.array(
      z.object({
        color: z.string(),
        img: z.string().url(),
        size: z.string(),
        quantity: z.number().min(0),
        price: z.number().min(0),
        sellerPrice: z.number().min(0),
      }),
    ),
    additionalInformation: z.array(
      z.object({ key: z.string(), value: z.string() }),
    ),
    status: z.string(),
    featured: z.boolean(),
    sellCount: z.number().min(0),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  })
  .partial();

export type ProductType = z.infer<typeof ProductSchema>;
