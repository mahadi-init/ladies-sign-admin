"use client";

import { StatusContext, useStatusContext } from "@/contexts/status-context";
import { Status } from "@/types/status";
import React from "react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function StatusProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status, setStatus } = useStatusContext();

  return (
    <StatusContext.Provider value={{ status, setStatus }}>
      {children}
      <ToastContainer />
    </StatusContext.Provider>
  );
}
