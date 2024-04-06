"use client";
import { Breadcrumbs } from "@/components/native/Breadcrumbs";
import ButtonGroup from "@/components/native/ButtonGroup";
import PageTop from "@/components/native/PageTop";
import AdditionalInformation from "@/shared/products/additional-information";
import GeneralInformation from "@/shared/products/general-information";
import ProductVariants from "@/shared/products/product-variants";

export default function AddProduct() {
  return (
    <div>
      <PageTop title="Add Product" showSubTitle={false} />
      <Breadcrumbs
        props={[
          { title: "Dashboard", link: "/dashboard" },
          { title: "Products", link: "/dashboard/products" },
        ]}
      />
      <form className="flex flex-col w-full gap-4 mt-4 mb-4">
        <GeneralInformation />
        <AdditionalInformation />
        <ProductVariants />
        <ButtonGroup />
      </form>
    </div>
  );
}
