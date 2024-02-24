import { addData } from "@/actions/post";
import { Breadcrumbs } from "@/components/native/Breadcrumbs";
import PageTop from "@/components/native/PageTop";
import { BACKEND_URL } from "@/consts/site-info";
import SharedAdminUI from "@/ui/SharedAdminUI";

export default async function AddAdmin() {
  const adminRoles = ["Admin", "Editor", "Seller"];

  return (
    <>
      <PageTop title="Add Admin" showSubTitle={false} />
      <Breadcrumbs
        props={[
          { title: "Dashboard", link: "/dashboard" },
          { title: "Admin", link: "/dashboard/admins" },
        ]}
      />
      <SharedAdminUI
        adminRoles={adminRoles}
        queryUrl={`${BACKEND_URL}/api/admin/add`}
        validationTag="admins"
        successMessage="Admin created successfully"
        serverAction={addData}
      />
    </>
  );
}
