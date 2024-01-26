import { useStatusContext } from "@/contexts/status-context";
import { Status } from "@/types/status";
import { Check, PencilIcon, Trash2 } from "lucide-react";
import Link from "next/link";
import { deleteCategory } from "./_action";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function DeleteCategory<T extends { _id: string }>({
  arg0,
}: {
  arg0: T;
}) {
  const { setStatus } = useStatusContext("Category Delete");
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsConfirmed(false);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [isConfirmed]);

  const handleFormAction = async () => {
    const res = await deleteCategory(arg0._id);

    if (res) {
      setStatus(Status.SUCCESS);
    } else {
      setStatus(Status.ERROR);
    }
  };

  return (
    <form action={handleFormAction} className="flex items-center gap-4">
      <Button variant="link">
        <Link href={`/dashboard/category/edit/${arg0._id}`}>
          <PencilIcon size={16} />
        </Link>
      </Button>
      {!isConfirmed && (
        <Button
          type="button"
          size="icon"
          variant="default"
          className="h-8 w-8"
          onClick={() => setIsConfirmed(true)}
        >
          <Trash2 size={16} />
        </Button>
      )}
      {isConfirmed && (
        <Button
          type="submit"
          size="icon"
          variant="destructive"
          className="h-8 w-8"
        >
          <Check size={16} />
        </Button>
      )}
    </form>
  );
}
