import { z } from "zod";

export const RoleSchema = z.enum(["SUPERADMIN", "ADMIN", "EDITOR"]);
export type RoleType = z.infer<typeof RoleSchema>;