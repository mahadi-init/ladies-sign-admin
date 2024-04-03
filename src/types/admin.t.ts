import { z } from "zod";

export const AdminSchema = z
  .object({
    _id: z.string(),
    name: z.string().min(3, "Name is too short"),
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    img: z.string().url(),
    address: z.string().min(8, "Address is too short"),
    phone: z.string().min(11, "Phone number must be 11 characters"),
    role: z.string(),
    status: z.boolean(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  })
  .partial();

export type AdminType = z.infer<typeof AdminSchema>;
