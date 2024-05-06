"use client";
import { Breadcrumbs } from "@/components/native/Breadcrumbs";
import ButtonGroup from "@/components/native/ButtonGroup";
import ImageUploader from "@/components/native/ImageUploader";
import PageTop from "@/components/native/PageTop";
import useStatus from "@/hooks/useStatus";
import addRequest from "@/https/add-request";
import { ProductType } from "@/types/product.t";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import AdditionalInformation from "../_components/additional-information";
import GeneralInformation from "../_components/general-information";
import { ProductCategory } from "../_components/product-category";
import ProductVariants from "../_components/product-variants";

export default function AddProduct() {
  const methods = useForm();
  const [img, setImg] = useState<string>();
  const [category, setCategory] = useState<string>();
  const [children, setChildren] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  const { trigger, isMutating } = useSWRMutation("/product/add", addRequest);
  const { showStatus } = useStatus();

  const onSubmit = async (formData: ProductType) => {
    console.log(formData.variants);

    const data = {
      ...formData,
      img: img,
      category: {
        name: category,
      },
      children: children,
      variants: [],
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
                <ImageUploader image={img} setImage={setImg} folder="product" />
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