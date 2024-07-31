import { z } from "zod";

export const CartItemSchema = z
  .object({
    _id: z.string(),
    name: z.string(),
    price: z.coerce.number().gt(0, "must be > 0"),
    quantity: z.coerce.number().gt(0, "must be > 0"),
    img: z.string().url(),
    sku: z.string(),
    color: z.string(),
  })
  .partial();

export const OrderSchema = z
  .object({
    _id: z.string(),
    name: z.string().min(2, "Name is too short"),
    invoice: z.string(),
    phone: z.string().min(11, "Phone number must be 11 characters"),
    address: z.string().min(2, "Address is too short"),
    cart: z.array(CartItemSchema),
    shippingCost: z.number(),
    sku: z.string(),
    subTotal: z.number(),
    total: z.number(),
    note: z.string(),
    trackingLink: z.string(),
    consignmentId: z.string(),
    sellerName: z.string(),
    sellerId: z.string(),
    status: z.string(),
    confirm: z.string(),
    lastChecked: z.string().datetime(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  })
  .partial();

export type OrderType = z.infer<typeof OrderSchema>;
