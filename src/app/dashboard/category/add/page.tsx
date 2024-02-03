import { addData } from "@/actions/post";
import SharedCategoryUI from "../ui";
import { getProductTypes } from "@/utils/get-product-types";
import { BACKEND_URL } from "@/consts/site-info";

export default async function AddCategory() {
  const productTypes = await getProductTypes();

  return (
    <SharedCategoryUI
      productTypes={productTypes}
      queryUrl={`${BACKEND_URL}/api/category/add`}
      validationTag="category"
      successMessage="Category added successfully"
      serverAction={addData}
    />
  );
}
