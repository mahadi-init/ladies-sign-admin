import { z } from "zod";
import { ProductStatusSchema } from "./product-status.t";

export const ProductSchema = z
  .object({
    _id: z.string(),
    name: z.string().min(3, "Name is too short"),
    thumbnail: z.string().url(),
    sku: z.string().min(3, "SKU is too short"),
    slug: z.string(),
    unit: z.string(),
    price: z.number().min(0),
    sellerPrice: z.number().min(0),
    quantity: z.number().min(0),
    description: z.string(),
    videoId: z.string(),
    reviews: z.array(z.string()),
    variants: z.array(
      z.object({
        color: z.string(),
        img: z.string().url(),
        size: z.string(),
        quantity: z.number().min(0),
        price: z.number().min(0),
        sellerPrice: z.number().min(0)
      })
    ),
    additionalInformation: z.array(
      z.object({ key: z.string(), value: z.string() })
    ),
    status: z.string(),
    featured: z.boolean(),
    sellCount: z.number().min(0),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  })
  .partial();

export type ProductType = z.infer<typeof ProductSchema>;
