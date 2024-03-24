import ButtonGroup from "@/components/native/ButtonGroup";
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

export default async function ProductUI() {
  const handleFormAction = async (formData: FormData) => {
    "use server";

    const title = formData.get("title");
    const description = formData.get("description");
    const price = formData.get("price");
    const sku = formData.get("sku");
    const quantity = formData.get("quantity");
    const discount = formData.get("discount");
    const sellerDiscount = formData.get("seller-discount");
    const videoId = formData.get("video");
    const tags = formData.get("tags")?.toString().split(",");
    const img = formData.get("main");
    const unit = formData.get("unit");
    const productType = formData.get("product-type");
    const brand = formData.get("brand");

    let additionalInformation = [];
    for (let i = 0; i < 20; i++) {
      const key = formData.get(`key-${i}`);
      const value = formData.get(`value-${i}`);
      if (!key || !value) {
        continue;
      }

      additionalInformation.push({ key: key, value: value });
    }

    let images = [];
    for (let i = 0; i < 20; i++) {
      const image = formData.get(`image-${i}`);
      const color = formData.get(`color-name-${i}`);
      const code = formData.get(`color-code-${i}`);
      const size = formData.get(`sizes-${i}`);
      const quantity = formData.get(`quantity-${i}`);
      if (!image || !color || !code || !size || !quantity) {
        continue;
      }

      images.push({
        img: image,
        name: color,
        color: code,
        size: size.toString().split(","),
        quantity: quantity, // add to database schema
      });
    }

    const data = {
      title,
      description,
      price,
      sku,
      quantity,
      discount,
      sellerDiscount,
      videoId,
      tags,
      img,
      // parent,
      // children,
      unit,
      productType,
      brand,
      // category: parent,
      additionalInformation,
      images,
    };

    // const res = await addData(
    //   data,
    //   `${BACKEND_URL}/api/product/add`,
    //   "products",
    //   "Product created successfully"
    // );

    // if (res.status === 200) {
    //   toast.success(res.message);
    // } else {
    //   toast.error(res.message);
    // }
  };

  return (
    <form action={handleFormAction} className="w-full flex flex-col gap-4 mb-4">
      <GeneralInformation />
      <AdditionalInformation />
      <ProductVariants />
      <ButtonGroup />
    </form>
  );
}
