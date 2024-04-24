"use client";
import { Breadcrumbs } from "@/components/native/Breadcrumbs";
import ButtonGroup from "@/components/native/ButtonGroup";
import PageTop from "@/components/native/PageTop";
import { FormProvider, useForm } from "react-hook-form";
import AdditionalInformation from "../_components/additional-information";
import GeneralInformation from "../_components/general-information";
import ProductVariants from "../_components/product-variants";

export default function AddProduct() {
  const methods = useForm();

  const onSubmit = (data: any) => {
    console.table(data);
  };

  return (
    <div>
      <PageTop title="Add Product" showSubTitle={false} />
      <Breadcrumbs
        props={[
          { title: "Dashboard", link: "/dashboard" },
          { title: "Products", link: "/dashboard/products" },
        ]}
      />
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-4 mt-4 mb-4"
        >
          <GeneralInformation />
          <AdditionalInformation />
          <ProductVariants />
          <ButtonGroup />
        </form>
      </FormProvider>
    </div>
  );
}
