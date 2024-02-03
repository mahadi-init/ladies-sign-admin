import { BACKEND_URL } from "@/consts/site-info";
import SharedAdminUI from "../ui";
import { addData } from "@/actions/post";

export default async function AddAdmin() {
  const AdminRoles = ["Super Admin", "Admin", "Manager", "CEO"];

  return (
    <SharedAdminUI
      adminRoles={AdminRoles}
      queryUrl={`${BACKEND_URL}/api/admin/add`}
      validationTag="admins"
      successMessage="Admin created successfully"
      serverAction={addData}
    />
  );
}