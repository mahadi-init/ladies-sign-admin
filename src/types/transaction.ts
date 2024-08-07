import { z } from "zod";

export const transactionSchema = z.object({
  _id: z.string().optional(),
  customerID: z.string(),
  role: z.enum(["USER", "SELLER"]),
  amount: z.string(),
  type: z.enum(["PAYMENT", "DEPOSIT"]),
  merchantInvoiceNumber: z.string(),
  paymentCreateTime: z.string(),
  paymentID: z.string(),
  transactionStatus: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type TransactionType = z.infer<typeof transactionSchema>;