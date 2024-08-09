import { Response } from "@/types/response";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import ConfirmationDialog from "./ConfirmationDialog";

export default function DeleteItem<T>({
  _id,
  action,
  message,
}: {
  _id?: string;
  action: (_id?: string) => Promise<Response<T>>;
  message: string;
}): JSX.Element {
  const handleFormAction = async () => {
    toast.loading("Deleting...")

    const res = await action(_id);
    toast.dismiss()

    if (res.success) {
      toast.success(message);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <ConfirmationDialog
      alertText="The action will perform a delete operation"
      action={handleFormAction}
    >
      <Button
        type="button"
        size="icon"
        className="h-6 w-6"
        variant="destructive"
      >
        <Trash2 size={16} />
      </Button>
    </ConfirmationDialog>
  );
}
