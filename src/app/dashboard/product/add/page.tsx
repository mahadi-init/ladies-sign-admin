import { Breadcrumbs } from "@/components/native/Breadcrumbs";
import PageTop from "@/components/native/PageTop";
import ProductUI from "@/ui/ProductUI";

export default async function AddProduct() {
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
        <ProductUI />
      </div>
    </div>
  );
}
