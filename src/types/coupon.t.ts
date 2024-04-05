import { z } from "zod";

export const CouponSchema = z
  .object({
    _id: z.string(),
    name: z.string().min(3, "Name is too short"),
    img: z.string().url(),
    couponCode: z.string(),
    startTime: z.string().datetime(),
    endTime: z.string().datetime(),
    discountPercentage: z.number().min(0),
    minimumAmount: z.number().min(0),
    productType: z.string(),
    status: z.boolean(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  })
  .partial();

export type CouponType = z.infer<typeof CouponSchema>;
