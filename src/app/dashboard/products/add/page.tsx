import { Breadcrumbs } from "@/components/native/Breadcrumbs";
import PageTop from "@/components/native/PageTop";
import { getAllBrandNames } from "@/shared/brands/get-all-brand-names";
import ProductUI from "@/shared/products/ProductUI";
import { getProductTypes } from "@/shared/products/get-product-types";

export default async function AddProduct() {
  const data = await Promise.all([
    await getProductTypes(),
    await getAllBrandNames(),
  ]);

  return (
    <div>
      <PageTop title="Add Product" showSubTitle={false} />
      <Breadcrumbs
        props={[
          { title: "Dashboard", link: "/dashboard" },
          { title: "Products", link: "/dashboard/products" },
        ]}
      />
      <div className="mt-4">
        <ProductUI productTypes={data[0]} brands={data[1]} />
      </div>
    </div>
  );
}
