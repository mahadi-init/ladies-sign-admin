"use client";
import { Breadcrumbs } from "@/components/native/Breadcrumbs";
import ButtonGroup from "@/components/native/ButtonGroup";
import PageTop from "@/components/native/PageTop";
import { ProductType } from "@/types/product";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import AdditionalKeyValue from "../_components/additional-key-value";
import GeneralInformation from "../_components/general-information";
import ProductVariants from "../_components/product-variants";

export default function AddProduct() {
  const methods = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<string[]>();

  const onSubmit = async (formData: ProductType) => {
    if (images?.length !== formData.variants?.length) {
      toast.error("Upload images for variants properly");
      return;
    }

    if (isLoading) {
      return;
    }

    const refinedVariants = formData.variants?.map((variant, index) => {
      return {
        ...variant,
        img: images?.[index],
      };
    });

    const data = {
      ...formData,
      variants: refinedVariants,
    };

    // const res = await trigger(data);
    // showStatus("/product", "Product added sucessfully", res);
  };

  return (
    <>
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
          className="mb-4 mt-4 flex w-full flex-col gap-4"
        >
          <GeneralInformation />
          <AdditionalKeyValue />
          <ProductVariants setIsLoading={setIsLoading} setImages={setImages} />
          <ButtonGroup />
        </form>
      </FormProvider>
    </>
  );
}
