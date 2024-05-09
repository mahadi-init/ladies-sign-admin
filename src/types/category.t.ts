import { z } from "zod";
import { ProductSchema } from "./product.t";

export const CategorySchema = z
  .object({
    _id: z.string(),
    name: z.string().min(3, "Name is too short"),
    img: z.string().url(),
    children: z.array(z.string()),
    productType: z.string(),
    description: z.string().min(8, "Description is too short"),
    products: z.array(ProductSchema),
    status: z.boolean(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  })
  .partial();

export type CategoryType = z.infer<typeof CategorySchema>;
