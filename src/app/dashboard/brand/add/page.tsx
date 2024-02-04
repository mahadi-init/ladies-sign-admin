import { BACKEND_URL } from "@/consts/site-info";
import { addData } from "@/actions/post";
import SharedBrandUI from "@/ui/SharedBrandUI";

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
