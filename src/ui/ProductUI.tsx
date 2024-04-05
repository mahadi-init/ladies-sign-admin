import ButtonGroup from "@/components/native/ButtonGroup";
import AdditionalInformation from "@/shared/products/additional-information";
import ProductVariants from "../shared/products/product-variants";

export default async function ProductUI() {
  return (
    <form className="w-full flex flex-col gap-4 mb-4">
      {/* <GeneralInformation /> */}
      <AdditionalInformation />
      <ProductVariants />
      <ButtonGroup />
    </form>
  );
}
