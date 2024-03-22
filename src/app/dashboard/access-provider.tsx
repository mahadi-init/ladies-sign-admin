"use client";
import { Role } from "@/types/enums.t";
import { AccessToken } from "@/types/token.t";
import React, { createContext, useEffect, useState } from "react";

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
      setUserRole("SUPERADMIN");
    } else if (accessToken === AccessToken.ADMIN) {
      setUserRole("ADMIN");
    } else if (accessToken === AccessToken.EDITOR) {
      setUserRole("EDITOR");
    } else if (accessToken === AccessToken.SELLER) {
      setUserRole("SELLER");
    }
  }, [accessToken]);

  return (
    <UserAccessContext.Provider value={{ userId, userRole }}>
      {children}
    </UserAccessContext.Provider>
  );
}
