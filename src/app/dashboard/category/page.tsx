import { BACKEND_URL } from "@/consts/site-info";
import SharedCategoryUI from "./_shared/ui";
import { addCategory } from "./_action";

const getProductTypes = async () => {
  const res = await fetch(`${BACKEND_URL}/api/product/all/product-types`);
  const types = await res.json();

  return types.data;
};

export default async function AddCategory() {
  const productTypes = await getProductTypes();

  return (
    <SharedCategoryUI productTypes={productTypes} serverAction={addCategory} />
  );
}
