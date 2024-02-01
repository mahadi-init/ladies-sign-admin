import { BACKEND_URL } from "@/consts/site-info";
import { editAdmin } from "./_action";
import SharedAdminUI from "../../_shared/ui";
import { AdminType } from "../../type";

const getAdminData = async (id: string): Promise<AdminType> => {
  const res = await fetch(`${BACKEND_URL}/api/admin/get/${id}`, {
    next: {
      revalidate: 10,
    },
  });
  const data = await res.json();

  return data;
};

export default async function EditCoupon({
  params,
}: {
  params: { id: string };
}) {
  const adminRoles = ["Super Admin", "Admin", "Manager", "CEO"];
  const data = await getAdminData(params.id);

  return (
    <SharedAdminUI {...data} adminRoles={adminRoles} serverAction={editAdmin} />
  );
}
