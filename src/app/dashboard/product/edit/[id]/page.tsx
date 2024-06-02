"use client";
import { Breadcrumbs } from "@/components/native/Breadcrumbs";
import ButtonGroup from "@/components/native/ButtonGroup";
import FetchErrorMessage from "@/components/native/FetchErrorMessage";
import { ImageUploader } from "@/components/native/ImageUploader";
import PageTop from "@/components/native/PageTop";
import SixSkeleton from "@/components/native/SixSkeleton";
import useStatus from "@/hooks/useStatus";
import addRequest from "@/https/add-request";
import { fetcher } from "@/https/get-request";
import { ProductType } from "@/types/product.t";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import AdditionalInformation from "../../_components/additional-information";
import GeneralInformation from "../../_components/general-information";
import { ProductCategory } from "../../_components/product-category";
import ProductVariants from "../../_components/product-variants";

export default function EditProduct({ params }: { params: { id: string } }) {
  const {
    data,
    isLoading: isDataLoading,
    error,
  } = useSWR<ProductType>(`/product/get/${params.id}`, fetcher);
  const methods = useForm();
  const [imgUrl, setImgUrl] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<string[]>();
  const [category, setCategory] = useState<string>();
  const [children, setChildren] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const { trigger, isMutating } = useSWRMutation("/product/add", addRequest);
  const { showStatus } = useStatus();

  useEffect(() => {
    if (data) {
      setCategory(data.category?.name);
      setChildren(data.children ?? []);
      setTags(data.tags ?? []);
      setImgUrl(data.img);

      // set images
      let images = data.variants?.map((item) => {
        return item.img;
      });

      setImages(images);
    }
  }, [data]);

  const onSubmit = async (formData: ProductType) => {
    if (!imgUrl) {
      toast.error("Please select an image for the product");
      return;
    }

    console.log(formData.variants?.length);
    console.log(images);

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
      img: imgUrl,
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

      {!isDataLoading ? (
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="flex flex-col w-full gap-4 mt-4 mb-4"
          >
            <GeneralInformation data={data}>
              <div className="flex flex-col pb-2 xl:flex-row justify-evenly xl:items-center">
                <div className="flex flex-col items-center ">
                  <ImageUploader
                    imgUrl={data?.img}
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
                    isFeatured={data?.featured}
                  />
                </div>
              </div>
            </GeneralInformation>
            <AdditionalInformation data={data} />
            <ProductVariants
              setIsLoading={setIsLoading}
              setImages={setImages}
              variantsData={data}
            />
            <ButtonGroup isMutating={isMutating} />
          </form>
        </FormProvider>
      ) : !error ? (
        <div className="mt-4 mb-4">
          <SixSkeleton />
        </div>
      ) : (
        <FetchErrorMessage error={error} />
      )}
    </>
  );
}
