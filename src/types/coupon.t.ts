import { z } from "zod";

export const CouponSchema = z
  .object({
    _id: z.string(),
    title: z.string().min(3, "Name is too short"),
    img: z.string().url(),
    couponCode: z.string().min(3, "Code is too short"),
    startTime: z.coerce.date().min(new Date()),
    endTime: z.coerce.date().min(new Date()),
    discountPercentage: z.coerce
      .number()
      .gt(0, "Discount must be greater than 0"),
    minimumAmount: z.coerce.number().min(0),
    productType: z.string(),
    status: z.boolean(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  })
  .partial();

export type CouponType = z.infer<typeof CouponSchema>;
