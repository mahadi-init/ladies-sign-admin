import { z } from "zod";

export const CategorySchema = z
  .object({
    _id: z.string(),
    name: z.string().min(3, "Name is too short"),
    img: z.string().url(),
    children: z.array(z.string()),
    productType: z.string(),
    description: z.string().min(8, "Description is too short"),
    //FIXME: Change this with the actual products
    products: z.array(z.any()),
    status: z.boolean(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  })
  .partial();

export type CategoryType = z.infer<typeof CategorySchema>;
