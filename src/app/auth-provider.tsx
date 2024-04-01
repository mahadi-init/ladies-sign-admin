"use client";
import UseAdmin, { AdminContext } from "@/hooks/useAdmin";
import { useRouter } from "next/navigation";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const { id, role, setId, setRole } = UseAdmin();

  return (
    <AdminContext.Provider value={{ id, role }}>
      {children}
    </AdminContext.Provider>
  );
}
