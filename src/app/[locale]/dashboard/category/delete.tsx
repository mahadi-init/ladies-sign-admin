import { ConfirmationDialog } from "@/components/native/ConfirmationDialog";
import { Button } from "@/components/ui/button";
import { BACKEND_URL } from "@/consts/site-info";
import { useStatusContext } from "@/contexts/status-context";
import { Status } from "@/types/status";
import { PencilIcon, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DeleteCategory<T extends { _id: string }>({
  arg0,
}: {
  arg0: T;
}) {
  const router = useRouter();
  const { setStatus } = useStatusContext("Category Delete");

  const handleDelete = async () => {
    setStatus(Status.LOADING);
    const res = await fetch(`${BACKEND_URL}/api/category/delete/${arg0._id}`, {
      method: "DELETE",
    });

    if (res.status === 200) {
      setStatus(Status.SUCCESS);
      router.refresh();
    } else {
      setStatus(Status.ERROR);
    }
  };

  return (
    <div className="flex gap-1">
      <Button size="icon" variant="ghost">
        <Link href={`/dashboard/category/edit/${arg0._id}`}>
          <PencilIcon size={16} />
        </Link>
      </Button>
      <ConfirmationDialog
        onConfirm={handleDelete}
        alertText="This action will delete the category"
      >
        <Button variant="ghost" size="icon">
          <Trash2 size={16} />
        </Button>
      </ConfirmationDialog>
    </div>
  );
}
