import { z } from "zod";
import { ProductStatusSchema } from "./product-status.t";

export const ProductSchema = z
  .object({
    _id: z.string(),
    name: z.string().min(3, "Name is too short"),
    img: z.string().url(),
    slug: z.string(),
    unit: z.string(),
    images: z.array(
      z.object({
        color: z.string(),
        code: z.string(),
        img: z.string().url(),
        size: z.array(z.string()),
      })
    ),
    children: z.string(),
    price: z.number().min(0),
    discount: z.number().min(0),
    quantity: z.number().min(0),
    productType: z.string(),
    description: z.string(),
    videoId: z.string(),
    brand: z.object({
      name: z.string(),
      id: z.string(),
    }),
    category: z.object({
      name: z.string(),
      id: z.string(),
    }),
    status: ProductStatusSchema,
    reviews: z.array(z.string()),
    additionalInformation: z.array(z.any()),
    tags: z.array(z.string()),
    sizes: z.array(z.string()),
    offerDate: z.object({
      startDate: z.date(),
      endDate: z.date(),
    }),
    featured: z.boolean(),
    sellCount: z.number().min(0),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  })
  .partial();

export type ProductType = z.infer<typeof ProductSchema>;
