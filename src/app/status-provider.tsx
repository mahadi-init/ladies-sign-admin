"use client";

import { StatusContext, useStatusContext } from "@/contexts/status-context";
import React from "react";

export default function StatusProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status, setStatus } = useStatusContext();

  return (
    <StatusContext.Provider value={{ status, setStatus }}>
      {children}
    </StatusContext.Provider>
  );
}
