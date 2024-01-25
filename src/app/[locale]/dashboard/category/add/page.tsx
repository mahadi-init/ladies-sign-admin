import { BACKEND_URL } from "@/consts/site-info";
import AddCategory from "./add-category";

const getProductTypes = async () => {
  const res = await fetch(`${BACKEND_URL}/api/product/all/product-types`);
  const types = await res.json();

  return types.data;
};

export default async function Page() {
  const productTypes = await getProductTypes();

  return (
    <div>
      <AddCategory productTypes={productTypes} />
    </div>
  );
}
