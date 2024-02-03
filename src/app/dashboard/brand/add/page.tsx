import { BACKEND_URL } from "@/consts/site-info";
import SharedBrandUI from "../ui";
import { addData } from "@/actions/post";

export default async function AddBrand() {
  return (
    <SharedBrandUI
      queryUrl={`${BACKEND_URL}/api/brand/add`}
      validationTag="brands"
      successMessage="Brand created successfully"
      serverAction={addData}
    />
  );
}
