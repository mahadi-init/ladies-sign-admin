import { useStatusContext } from "@/contexts/status-context";
import { PencilIcon, Trash2 } from "lucide-react";
import Link from "next/link";
import { deleteCategory } from "./_action";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import DeleteButton from "@/components/native/DeleteButton";

export default function DeleteCategory({ id }: { id?: string }) {
  const { setSuccessStatus, setErrorStatus } = useStatusContext();
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
    const res = await deleteCategory(id!!);

    if (res.status === 200) {
      setSuccessStatus(res.message);
    } else {
      setErrorStatus(res.message);
    }
  };

  return (
    <form action={handleFormAction} className="flex items-center gap-4">
      <Button className="w-6 h-6" variant="outline">
        <Link href={`/dashboard/category/edit/${id}`}>
          <PencilIcon size={16} />
        </Link>
      </Button>
      {!isConfirmed && (
        <Button
          type="button"
          size="icon"
          className="h-6 w-6"
          onClick={() => setIsConfirmed(true)}
        >
          <Trash2 size={16} />
        </Button>
      )}
      {isConfirmed && <DeleteButton />}
    </form>
  );
}
