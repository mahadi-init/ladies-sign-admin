"use client";

import ConfirmationDialog from "@/components/native/ConfirmationDialog";
import { Button } from "@/components/ui/button";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    deleteCookie("auth");
    router.replace("/");
  };

  return (
    <ConfirmationDialog
      alertText="You will logged out from seller profile"
      action={() => {
        toast.promise(handleLogout, {
          loading: "Loading...",
          success: () => {
            return `Logout successful`;
          },
          error: "Error",
        });
      }}
    >
      <Button variant="destructive">Logout</Button>
    </ConfirmationDialog>
  );
}
