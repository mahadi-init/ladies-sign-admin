import getData from "@/actions/get";
import PageTop from "@/components/native/PageTop";
import { BACKEND_URL } from "@/consts/site-info";
import { getProductTypes } from "@/utils/get-product-types";
import Wrapper from "./wrapper";

export interface ProductResponse {
  _id: string;
  img: string;
  title: string;
  productType: string;
  brand: {
    name: string;
  };
  category: {
    name: string;
  };
  price: number;
  status: string;
  quantity: number;
}

const getProducts = async () => {
  const res = await getData<ProductResponse[]>(
    `${BACKEND_URL}/api/product/all`,
    10,
    ["product", "products"]
  );

  //@ts-ignore
  return res.data;
};

export default async function Products() {
  const data = await Promise.all([
    await getProductTypes(),
    await getProducts(),
  ]);

  return (
    <>
      <PageTop title="Products" />
      <Wrapper productTypes={data[0]} products={data[1]} />
    </>
  );
}
