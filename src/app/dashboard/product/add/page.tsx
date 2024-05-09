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
import AdditionalInformation from "../_components/additional-information";
import GeneralInformation from "../_components/general-information";
import { ProductCategory } from "../_components/product-category";
import ProductVariants from "../_components/product-variants";
import { useUploadThing } from "@/utils/uploadthing";

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

  const { startUpload } = useUploadThing("product", {
    onClientUploadComplete: (res) => {
      toast.dismiss();
      toast.success("Image variants uploaded successfully");
      setIsLoading(false);

      setImages(
        res.map((r) => {
          return r.url;
        }),
      );
    },
    onUploadError: () => {
      toast.dismiss();
      toast.error("Image variants upload failed");
      setIsLoading(false);
    },
    onUploadBegin: () => {
      toast.dismiss();
      toast.loading("Image variants uploading...");
      setIsLoading(true);
    },
  });

  const onSubmit = async (formData: ProductType) => {
    const variants = formData.variants;
    startUpload(
      variants?.map((variant) => {
        return variant.img[0];
      }) as [],
    );

    const refinedVariants = variants?.map((variant) => {
      return {
        ...variant,
        img: images,
      };
    });

    if (isLoading) {
      toast.error("Please wait for image upload to complete");
      return;
    }

    const data = {
      ...formData,
      img: imgUrl,
      category: {
        name: category,
      },
      children: children,
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

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-4 mt-4 mb-4"
        >
          <GeneralInformation>
            <div className="flex flex-col pb-2 xl:flex-row justify-evenly xl:items-center">
              <div className="flex flex-col items-center ">
                <ImageUploader
                  setIsLoading={setIsLoading}
                  setImgUrl={setImgUrl}
                  endpoint="product"
                />
              </div>

              <div className="flex flex-col gap-4 xl:w-1/2">
                <ProductCategory
                  category={category}
                  setCategory={setCategory}
                  childrens={children}
                  setSelectedChildrens={setChildren}
                  tags={tags}
                  setTags={setTags}
                />
              </div>
            </div>
          </GeneralInformation>
          <AdditionalInformation />
          <ProductVariants />
          <ButtonGroup isMutating={isMutating} />
        </form>
      </FormProvider>
    </>
  );
}