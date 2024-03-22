import { addData } from "@/actions/post";
import { getProductTypes } from "@/shared/products/get-product-types";
import { BACKEND_URL } from "@/site-info";
import CategoryUI from "./CategoryUI";

export default async function AddCategory() {
  const productTypes = await getProductTypes();
  console.log(productTypes);

  return (
    <CategoryUI
      productTypes={productTypes}
      queryUrl={`${BACKEND_URL}/api/category/add`}
      validationTag="category"
      successMessage="Category added successfully"
      serverAction={addData}
    />
  );
}
