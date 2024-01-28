"use client";

import { StatusContext, useStatusContext } from "@/contexts/status-context";
import React from "react";

export default function StatusProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { startLoading, setSuccessStatus, setErrorStatus } = useStatusContext();

  return (
    <StatusContext.Provider
      value={{ startLoading, setSuccessStatus, setErrorStatus }}
    >
      {children}
    </StatusContext.Provider>
  );
}
