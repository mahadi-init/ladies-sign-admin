// export type Status = "ACTIVE" | "INACTIVE" | "BLOCKED" | "SHOW" | "HIDE";

import { z } from "zod";

export const OrderStatusSchema = z.enum([
  "PENDING",
  "PROCESSING",
  "DELIVERED",
  "CANCELLED",
])

export type OrderStatusType = z.infer<typeof OrderStatusSchema>