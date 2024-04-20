import { z } from "zod";

// #region
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
  })
  .partial();

export type ExtraType = z.infer<typeof ExtraSchema>;
