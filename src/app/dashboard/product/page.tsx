import getData from "@/actions/get";
import PageTop from "@/components/native/PageTop";
import { siteConfig } from "@/site-info";

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
  return await getData<ProductResponse[]>(
    `${siteConfig.BACKEND_URL}/api/product/all`,
    true,
    10,
    ["product", "products"]
  );
};

export default async function Products() {
  // const data = await Promise.all([
  //   await getProductTypes(),
  //   await getProducts(),
  // ]);

  return (
    <>
      <PageTop title="Products" />
      {/* <Wrapper productTypes={data[0]} products={data[1]} /> */}
    </>
  );
}
