import { z } from "zod";

export const UserSchema = z
  .object({
    _id: z.string(),
    name: z.string(),
    phone: z.string().min(11, "minium 11 characters required"),
    address: z.string(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  })
  .partial();

export type UserType = z.infer<typeof UserSchema>;
