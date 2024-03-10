"use client";
import ButtonGroup from "@/components/native/ButtonGroup";
import { useState } from "react";
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
  image?: string;
}

export default function SharedProductUI({
  productTypes,
  brands,
}: {
  productTypes: string[];
  brands: string[];
}) {
  const [image, setImage] = useState<string>();
  const [selectedType, setSelectedType] = useState<string>();
  const [selectedBrand, setSelectedBrand] = useState<string>();

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

  const handleFormAction = (formData: FormData) => {
    const title = formData.get("title");
    const description = formData.get("description");
    const price = formData.get("price");
    const sku = formData.get("sku");
    const quantity = formData.get("quantity");
    const discount = formData.get("discount");
    const video = formData.get("video");

    console.log(title, description, price, sku, quantity, discount, video);
  };

  return (
    <form action={handleFormAction} className="w-full flex flex-col gap-4 mb-4">
      <GeneralInformation image={image} setImage={setImage} />
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
