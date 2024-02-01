import SharedAdminUI from "../_shared/ui";
import { addCategory } from "./_action";

export default async function AddCategory() {
  const AdminRoles = ["Super Admin", "Admin", "Manager", "CEO"];

  return <SharedAdminUI adminRoles={AdminRoles} serverAction={addCategory} />;
}
