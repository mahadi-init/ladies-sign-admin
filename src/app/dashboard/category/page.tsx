import { addData } from "@/actions/post";
import { BACKEND_URL } from "@/site-info";
import { getProductTypes } from "@/utils/get-product-types";
import CategoryUI from "./CategoryUI";

export default async function AddCategory() {
  const productTypes = await getProductTypes();

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
