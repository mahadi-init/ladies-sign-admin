import { addData } from "@/actions/post";
import { BACKEND_URL } from "@/site-info";
import BrandUI from "./BrandUI";

export default async function AddBrand() {
  return (
    <BrandUI
      queryUrl={`${BACKEND_URL}/api/brand/add`}
      validationTag="brands"
      successMessage="Brand created successfully"
      serverAction={addData}
    />
  );
}
