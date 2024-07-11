"use client";
import { sellerColumn } from "@/columns/SellerColumn";
import PageTop from "@/components/native/PageTop";
import addRequest from "@/https/add-request";
import SellerUI from "@/ui/SellerUI";
import TableUIWrapper from "@/ui/TableUIWrapper";
import { useEffect, useState } from "react";
import useSWRMutation from "swr/mutation";

export default function Seller() {
  const [show, setShow] = useState<boolean>();
  const { trigger, isMutating } = useSWRMutation(
    `/seller/register`,
    addRequest,
  );

  useEffect(() => {
    const showSeller = localStorage.getItem("show-seller");

    if (showSeller === "true") {
      setShow(true);
    } else {
      setShow(false);
    }
  }, []);

  return (
    <>
      <PageTop title="Seller" />
      <div className="flex flex-col justify-between gap-4 xl:flex-row">
        {show && (
          <SellerUI
            trigger={trigger}
            isMutating={isMutating}
            successMessage="Seller add successfully"
          />
        )}
        <TableUIWrapper route="/seller" columns={sellerColumn} />
      </div>
    </>
  );
}
