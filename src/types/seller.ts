import { z } from "zod";

export const SellerSchema = z
  .object({
    _id: z.string().optional(),
    name: z.string().min(1, "name can't be emptys"),
    email: z.string().optional(),
    phone: z.string().min(11, "minimum 11 characters required"),
    password: z.string().min(6, "minimum 6 characters required"),
    img: z.string().url(),
    address: z.string().min(1, "address can't be empty"),
    approved: z.boolean(),
    whatsapp: z.string().min(11, "minimum 11 characters required"),
    nid: z.string(),
    license: z.string(),
    balance: z.number(),
    facebookProfile: z.string().min(1, "profile can't be empty"),
    facebookPage: z.string(),
    status: z.boolean(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  })
  .partial();

export type SellerType = z.infer<typeof SellerSchema>;
