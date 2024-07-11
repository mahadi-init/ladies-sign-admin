"use client";

import PageTop from "@/components/native/PageTop";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Shield, ShieldAlertIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Settings() {
  const [isShowAdmin, setShowAdmin] = useState<boolean>();
  const [isShowSeller, setShowSeller] = useState<boolean>();

  useEffect(() => {
    const showAdmin = localStorage.getItem("show-admin");
    const showSeller = localStorage.getItem("show-seller");

    if (showAdmin === "true") {
      setShowAdmin(true);
    } else {
      setShowAdmin(false);
    }

    if (showSeller === "true") {
      setShowSeller(true);
    } else {
      setShowSeller(false);
    }
  }, []);

  const changeAdminShow = (checked: boolean) => {
    if (checked) {
      setShowAdmin(true);
      localStorage.setItem("show-admin", "true");
    } else {
      setShowAdmin(false);
      localStorage.setItem("show-admin", "false");
    }
  };

  const changeSellerShow = (checked: boolean) => {
    if (checked) {
      setShowSeller(true);
      localStorage.setItem("show-seller", "true");
    } else {
      setShowSeller(false);
      localStorage.setItem("show-seller", "false");
    }
  };

  return (
    <>
      <PageTop title="Settings" />
      <div className="mt-8 flex flex-wrap gap-4">
        <Card className="flex w-fit flex-col items-center justify-center gap-2 p-4">
          <Shield size={56} className="text-green-600" />
          <div className="flex gap-2">
            <Label htmlFor="checkbox-1" className="text-lg">
              Add new admin from admin page
            </Label>
            <input
              type="checkbox"
              className="checkbox checkbox-primary w-8"
              id="checkbox-1"
              checked={isShowAdmin}
              onChange={(e) => changeAdminShow(e.target.checked)}
            />
          </div>
          <Image
            src="/images/admin-input.png"
            className="mt-4"
            height={250}
            width={250}
            alt="admin"
          />
        </Card>

        <Card className="flex w-fit flex-col items-center justify-center gap-2 p-4">
          <ShieldAlertIcon size={56} className="text-green-600" />
          <div className="flex gap-2">
            <Label htmlFor="checkbox-2" className="text-lg">
              Add new seller from seller page
            </Label>
            <input
              type="checkbox"
              className="checkbox checkbox-primary w-8"
              id="checkbox-2"
              checked={isShowSeller}
              onChange={(e) => changeSellerShow(e.target.checked)}
            />
          </div>
          <Image
            src="/images/seller-input.png"
            className="mt-4"
            height={200}
            width={200}
            alt="admin"
          />
        </Card>
      </div>
    </>
  );
}
