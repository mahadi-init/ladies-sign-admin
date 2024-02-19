"use client";
import { Response } from "@/types/response";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import ConfirmationDialog from "./ConfirmationDialog";

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

/**
 * This function handles the form action for deleting an item.
 *
 * @param {PropTypes} props - the properties passed to the component
 * @return {JSX.Element} The JSX element representing the form
 */
export default function DeleteItem(props: PropTypes): JSX.Element {
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
