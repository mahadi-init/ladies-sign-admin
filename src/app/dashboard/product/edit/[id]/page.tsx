"use client";
import { Breadcrumbs } from "@/components/native/Breadcrumbs";
import ButtonGroup from "@/components/native/ButtonGroup";
import FetchErrorMessage from "@/components/native/FetchErrorMessage";
import PageTop from "@/components/native/PageTop";
import useStatus from "@/hooks/useStatus";
import addRequest from "@/https/add-request";
import { fetcher } from "@/https/get-request";
import { ProductType } from "@/types/product.t";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import GeneralInformation from "../../_components/general-information";
import ProductVariants from "../../_components/product-variants";
import AdditionalKeyValue from "../../_components/additional-key-value";
import SixSkeleton from "@/components/native/SixSkeleton";

export default function EditProduct({ params }: { params: { id: string } }) {
  const {
    data,
    isLoading: isDataLoading,
    error,
  } = useSWR<ProductType>(`/product/get/${params.id}`, fetcher);
  const methods = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<string[]>();
  const { trigger, isMutating } = useSWRMutation(
    `/product/edit${params.id}`,
    addRequest,
  );
  const { showStatus } = useStatus();

  useEffect(() => {
    if (data) {
      // set images
      let images = data.variants?.map((item) => {
        return item.img;
      });

      setImages(images);
    }
  }, [data]);

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

      {!isDataLoading ? (
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="mb-4 mt-4 flex w-full flex-col gap-4"
          >
            <GeneralInformation data={data} />
            <AdditionalKeyValue />
            <ProductVariants
              setIsLoading={setIsLoading}
              setImages={setImages}
              variantsData={data}
            />
            <ButtonGroup isMutating={isMutating} />
          </form>
        </FormProvider>
      ) : !error ? (
        <div className="mb-4 mt-4">
          <SixSkeleton />
        </div>
      ) : (
        <FetchErrorMessage error={error} />
      )}
    </>
  );
}
