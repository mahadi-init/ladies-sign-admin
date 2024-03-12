"use client";

import ConfirmationDialog from "@/components/native/ConfirmationDialog";
import { Button } from "@/components/ui/button";
import useLogout from "@/hooks/useLogout";
import { toast } from "sonner";

export default function LogoutButton() {
  const { handleLogout } = useLogout();

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
      <Button variant="destructive" className="w-full mt-2">
        Logout
      </Button>
    </ConfirmationDialog>
  );
}
