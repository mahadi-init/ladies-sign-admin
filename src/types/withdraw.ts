import { z } from "zod";

export const WithdrawSchema = z.object({
  _id: z.string().optional(),
  sellerID: z.string(),
  status: z.enum(["PENDING", "HOLD", "COMPLETE"]),
  amount: z.number(),
  message: z.string(),
  bkash: z.string().min(11, "minimum 11 characters required"),
  nogod: z.string().min(11, "minimum 11 characters required"),
  rocket: z.string().min(11, "minimum 11 characters required"),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type WithdrawType = z.infer<typeof WithdrawSchema>;