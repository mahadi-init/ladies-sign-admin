import { addData } from "@/actions/post";
import AdminUI from "@/app/dashboard/admins/AdminUI";
import { BACKEND_URL } from "@/site-info";

export default async function AddAdmin() {
  const adminRoles = ["SELLER", "EDITOR", "ADMIN", "SUPERADMIN"];

  return (
    <>
      <AdminUI
        adminRoles={adminRoles}
        queryUrl={`${BACKEND_URL}/api/admin/add`}
        validationTag="admins"
        successMessage="Admin created successfully"
        serverAction={addData}
      />
    </>
  );
}
