"use client";

import { adminColumn } from "@/columns/AdminColumn";
import PageTop from "@/components/native/PageTop";
import addRequest from "@/https/add-request";
import AdminUI from "@/ui/AdminUI";
import TableUIWrapper from "@/ui/TableUIWrapper";
import { useEffect, useState } from "react";
import useSWRMutation from "swr/mutation";

export default function AddAdmin() {
  const [show, setShow] = useState<boolean>();
  const { trigger, isMutating } = useSWRMutation(`/admin/register`, addRequest);

  useEffect(() => {
    const showAdmin = localStorage.getItem("show-admin");

    if (showAdmin === "true") {
      setShow(true);
    } else {
      setShow(false);
    }
  }, []);

  return (
    <>
      <PageTop title="Admins" />
      <div className="flex flex-col justify-between gap-4 xl:flex-row">
        {show && (
          <AdminUI
            trigger={trigger}
            isMutating={isMutating}
            successMessage="Admin added successfully"
          />
        )}
        <TableUIWrapper route="/admin" columns={adminColumn} />
      </div>
    </>
  );
}
