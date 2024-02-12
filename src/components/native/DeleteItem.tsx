import React from "react";
import { Response } from "@/types/response";
import { toast } from "sonner";
import ConfirmationDialog from "./ConfirmationDialog";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

interface PropTypes {
  queryUrl: string;
  validationTag: string;
  successMessage: string;
  serverAction: (
    queryUrl: string,
    validationTag: string,
    successMessage: string,
  ) => Promise<Response>;
}

export default function DeleteItem(props: PropTypes) {
  const handleFormAction = async () => {
    const res = await props.serverAction(
      props.queryUrl,
      props.validationTag,
      props.successMessage,
    );

    if (res.status === 200) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <form>
      <ConfirmationDialog
        alertText="The action will perform a delete operation"
        action={handleFormAction}
      >
        <Button type="button" size="icon" className="w-6 h-6">
          <Trash2 size={16} />
        </Button>
      </ConfirmationDialog>
    </form>
  );
}
