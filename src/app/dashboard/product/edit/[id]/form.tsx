"use client";
import { Breadcrumbs } from "@/components/native/Breadcrumbs";
import ButtonGroup from "@/components/native/ButtonGroup";
import PageTop from "@/components/native/PageTop";
import { ProductType } from "@/types/product";
import { useEffect, useState, useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import AdditionalKeyValue from "../../_components/additional-key-value";
import GeneralInformation from "../../_components/general-information";
import ProductVariants from "../../_components/product-variants";
import { update } from "./action";

export default function ProductForm({ data }: { data: ProductType }) {
  const methods = useForm();
  const [isPending, startTransition] = useTransition()
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<string[]>();

  useEffect(() => {
    if (data) {
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

    const refinedData: any = {
      ...formData,
      variants: refinedVariants,
    };

    startTransition(async () => {
      const res = await update(data._id as string as string, refinedData)

      if (res.success) {
        toast.success("Product updated")
      } else {
        toast.error(res.message)
      }
    })
  };

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="mb-4 mt-4 flex w-full flex-col gap-4"
        >
          <GeneralInformation data={data} />
          <AdditionalKeyValue data={data} />
          <ProductVariants
            setIsLoading={setIsLoading}
            setImages={setImages}
            variantsData={data}
          />
          <ButtonGroup isMutating={isPending} />
        </form>
      </FormProvider>
    </>
  );
}