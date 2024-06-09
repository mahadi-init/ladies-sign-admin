"use client";
import { Breadcrumbs } from "@/components/native/Breadcrumbs";
import ButtonGroup from "@/components/native/ButtonGroup";
import { ImageUploader } from "@/components/native/ImageUploader";
import PageTop from "@/components/native/PageTop";
import useStatus from "@/hooks/useStatus";
import addRequest from "@/https/add-request";
import { ProductType } from "@/types/product.t";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";
import GeneralInformation from "../_components/general-information";
import ProductVariants from "../_components/product-variants";
import AdditionalKeyValue from "../_components/additional-key-value";

export default function AddProduct() {
  const methods = useForm();
  const [imgUrl, setImgUrl] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<string[]>();
  const [category, setCategory] = useState<string>();
  const [children, setChildren] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const { trigger, isMutating } = useSWRMutation("/product/add", addRequest);
  const { showStatus } = useStatus();

  const onSubmit = async (formData: ProductType) => {
    if (!imgUrl) {
      toast.error("Please select an image for the product");
      return;
    }

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
      thumbnail: imgUrl,
      category: {
        name: category,
      },
      children: children,
      variants: refinedVariants,
      tags: tags,
    };

    const res = await trigger(data);
    showStatus("/product", "Product added sucessfully", res);
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
          <GeneralInformation>
            <div className="flex flex-col justify-evenly pb-2 xl:flex-row xl:items-center">
              <div className="flex flex-col items-center">
                <ImageUploader
                  setIsLoading={setIsLoading}
                  setImgUrl={setImgUrl}
                  endpoint="product"
                />
              </div>
            </div>
          </GeneralInformation>
          {/* <AdditionalKeyValue data={data as ProductType} /> */}
          <ProductVariants setIsLoading={setIsLoading} setImages={setImages} />
          <ButtonGroup isMutating={isMutating} />
        </form>
      </FormProvider>
    </>
  );
}
