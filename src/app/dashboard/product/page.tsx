import { productColumn } from "@/columns/ProductColumn";
import PageTop from "@/components/native/PageTop";
import ProductUIWrapper from "@/ui/ProductUIWrapper";

//TODO: ADD FEATURED PRODUCT FIELD
export default function Products() {
  return (
    <>
      <PageTop title="Products" />
      <ProductUIWrapper route="/product" columns={productColumn} />
    </>
  );
}
