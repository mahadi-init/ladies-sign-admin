import { z } from "zod";

const ExtraSchema = z
  .object({
    productTypes: z.string().array(),
    colors: z
      .object({
        name: z.string(),
        code: z.string(),
      })
      .array(),
    sizes: z.string().array(),
    _id: z.string(),
  })
  .partial();

export type ExtraType = z.infer<typeof ExtraSchema>;