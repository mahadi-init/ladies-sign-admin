import { z } from "zod";

export const UserSchema = z
  .object({
    _id: z.string(),
    name: z.string(),
    password: z.string().min(6, "minimum 6 characters required"),
    phone: z.string().min(11, "minium 11 characters required"),
    address: z.string(),
    status: z.boolean(),
    // FIX: add require field
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  })
  .partial();

export type UserType = z.infer<typeof UserSchema>;