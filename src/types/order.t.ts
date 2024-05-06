import { z } from "zod";
import { OrderStatusSchema } from "./order-status.t";
import { UserSchema } from "./user.t";
import { SellerSchema } from "./seller.t";
import { ProductSchema } from "./product.t";

const OrderSchema = z
  .object({
    _id: z.string(),
    user: UserSchema,
    seller: SellerSchema,
    invoice: z.number(),
    cart: z.array(ProductSchema),
    phone: z.string().min(11, "minium 11 characters required"),
    address: z.string(),
    city: z.string(),
    total: z.number(),
    subTotal: z.number(),
    shippingCost: z.number(),
    discount: z.number(),
    shippingOption: z.string(),
    paymentMethod: z.string(),
    paymentDetails: z.object({}),
    trackingCode: z.string(),
    trackingLink: z.string(),
    status: OrderStatusSchema,
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  })
  .partial();

export type OrderType = z.infer<typeof OrderSchema>;