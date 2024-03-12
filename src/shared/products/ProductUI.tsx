"use client";
import { addData } from "@/actions/post";
import ButtonGroup from "@/components/native/ButtonGroup";
import { useState } from "react";
import { toast } from "sonner";
import { BACKEND_URL } from "../../../site-info";
import AdditionalInformation from "./additional-information";
import GeneralInformation from "./general-information";
import ProductVariants from "./product-variants";

export interface Field {
  key?: string;
  value?: string;
}

export interface ColorVariant {
  name?: string;
  code?: string;
  sizes?: string;
  img?: string;
}

export default function SharedProductUI({
  productTypes,
  brands,
}: {
  productTypes: string[];
  brands: string[];
}) {
  const [img, setImg] = useState<string>();
  const [selectedType, setSelectedType] = useState<string>();
  const [selectedBrand, setSelectedBrand] = useState<string>();
  const [parent, setParent] = useState<string>();
  const [selectedChildrens, setSelectedChildrens] = useState<string[]>([]);

  const [fields, setFields] = useState<Field[]>([
    {
      key: "",
      value: "",
    },
  ]);
  const [colorVariants, setColorVariants] = useState<ColorVariant[]>([
    {
      name: "",
      code: "",
      sizes: "",
    },
  ]);

  const handleFormAction = async (formData: FormData) => {
    //general information
    const title = formData.get("title");
    const description = formData.get("description");
    const price = formData.get("price");
    const sku = formData.get("sku");
    const quantity = formData.get("quantity");
    const discount = formData.get("discount");
    const videoId = formData.get("video");
    const tags = formData.get("tags")?.toString().split(",");
    const children = selectedChildrens.toString();

    // Additional information
    const unit = formData.get("unit");
    const productType = selectedType;
    const brand = selectedBrand;
    const additionalInformation = fields;

    if (!img) {
      toast.error("main image can't be empty");
      return;
    }

    const images = colorVariants.map((variant) => {
      {
        variant.name, variant.code, variant.sizes?.split(","), variant.img;
      }
    });

    const data = {
      title,
      description,
      price,
      sku,
      quantity,
      discount,
      videoId,
      tags,
      img,
      parent,
      children,
      unit,
      productType,
      brand,
      category: parent,
      additionalInformation,
      images,
    };

    const res = await addData(
      data,
      `${BACKEND_URL}/api/product/add`,
      "products",
      "Product created successfully"
    );

    if (res.status === 200) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <form action={handleFormAction} className="w-full flex flex-col gap-4 mb-4">
      <GeneralInformation
        image={img}
        setImage={setImg}
        parent={parent}
        setParent={setParent}
        selectedChildrens={selectedChildrens}
        setSelectedChildrens={setSelectedChildrens}
      />
      <AdditionalInformation
        productTypes={productTypes}
        brands={brands}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedBrand={selectedBrand}
        setSelectedBrand={setSelectedBrand}
        fields={fields}
        setFields={setFields}
      />
      <ProductVariants
        colorVariants={colorVariants}
        setColorVariants={setColorVariants}
      />
      <ButtonGroup />
    </form>
  );
}
