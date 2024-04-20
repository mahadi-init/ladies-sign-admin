import { z } from "zod";

export const ProductStatusSchema = z.enum(["SUPERADMIN", "ADMIN", "EDITOR"]);
export type ProductStatusType = z.infer<typeof ProductStatusSchema>;
