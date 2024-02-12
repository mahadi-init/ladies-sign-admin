import { addData } from "@/actions/post";
import { BACKEND_URL } from "@/consts/site-info";
import SharedUserUI from "@/ui/SharedUserUI";

export default async function AddUser() {
  return (
    <SharedUserUI
      queryUrl={`${BACKEND_URL}/api/user/create`}
      validationTag="users"
      successMessage="User added successfully"
      serverAction={addData}
    />
  );
}
