import { Role } from "@/types/enums.t";
import { createContext, useContext } from "react";

export const AdminContext = createContext<{
  id?: string;
  role?: Role;
  setId?: (id: string) => void;
  setRole?: (role: Role) => void;
}>({});

export default function UseAdmin() {
  const { id, role, setId, setRole } = useContext(AdminContext);

  return {
    id,
    role,
    setId,
    setRole,
  };
}
