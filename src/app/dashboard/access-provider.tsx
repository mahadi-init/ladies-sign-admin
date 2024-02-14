"use client";

import React, { createContext, useEffect, useState } from "react";
import { Role } from "@/types/role";
import { AccessToken } from "@/types/token";

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

    if (accessToken === AccessToken.SUPER_ADMIN) {
      setUserRole(Role.SuperAdmin);
    } else if (accessToken === AccessToken.ADMIN) {
      setUserRole(Role.Admin);
    } else if (accessToken === AccessToken.EDITOR) {
      setUserRole(Role.Editor);
    } else if (accessToken === AccessToken.SELLER) {
      setUserRole(Role.Seller);
    }
  }, [accessToken]);

  return (
    <UserAccessContext.Provider value={{ userId, userRole }}>
      {children}
    </UserAccessContext.Provider>
  );
}
