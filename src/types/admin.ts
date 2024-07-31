import { z } from "zod";

export const AdminSchema = z
  .object({
    _id: z.string().optional(),
    name: z.string().min(2, "Name is too short"),
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    phone: z.string().min(11, "Phone number must be 11 characters"),
    img: z.string().url(),
    role: z.enum(["SUPERADMIN", "ADMIN", "EDITOR"]),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  })
  .partial();

export type AdminType = z.infer<typeof AdminSchema>;
