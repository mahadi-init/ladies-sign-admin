"use client";

import React, { createContext, useEffect, useState } from "react";
import { Role } from "@/types/role";

export const UserAccessContext = createContext<{
  userId?: string;
  userRole?: Role;
}>({});

export default function AccessProvider({
  userId,
  accessToken,
  children,
}: {
  userId?: string;
  accessToken?: string;
  children: React.ReactNode;
}) {
  const [userRole, setUserRole] = useState<Role>();

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    if (accessToken === process.env.NEXT_PUBLIC_SUPER_ADMIN_TOKEN) {
      setUserRole(Role.SuperAdmin);
    } else if (accessToken === process.env.NEXT_PUBLIC_ADMIN_TOKEN) {
      setUserRole(Role.Admin);
    } else if (accessToken === process.env.NEXT_PUBLIC_EDITOR_TOKEN) {
      setUserRole(Role.Editor);
    } else if (accessToken === process.env.NEXT_PUBLIC_SELLER_TOKEN) {
      setUserRole(Role.Seller);
    }
  }, [accessToken]);

  return (
    <UserAccessContext.Provider value={{ userId, userRole }}>
      {children}
    </UserAccessContext.Provider>
  );
}
