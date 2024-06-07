import { z } from "zod";
import { ProductSchema } from "./product.t";

const OrderSchema = z
  .object({
    _id: z.string(),
    personID: z.string(),
    name: z.string(),
    invoice: z.number(),
    cart: z.array(ProductSchema),
    phone: z.string().min(11, "minium 11 characters required"),
    address: z.string(),
    subTotal: z.number(),
    shippingCost: z.number(),
    total: z.number(),
    trackingLink: z.string(),
    status: z.string(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  })
  .partial();

export type OrderType = z.infer<typeof OrderSchema>;
