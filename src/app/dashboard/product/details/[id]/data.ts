import { ProductModel } from "@/models/product.model"
import { cache } from "react"

export const getProductData = cache(async (id?: string) => {
  const res = await ProductModel.findById(id)

  return JSON.stringify(res)
})
