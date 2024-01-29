import { useStatusContext } from "@/contexts/status-context";
import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import DeleteButton from "@/components/native/DeleteButton";
import { Response } from "@/types/response";

export default function DeleteItem({
  id,
  serverAction,
}: {
  id?: string;
  serverAction: (id: string) => Promise<Response>;
}) {
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
    const res = await serverAction(id!!);

    if (res.status === 200) {
      setSuccessStatus(res.message);
    } else {
      setErrorStatus(res.message);
    }
  };

  return (
    <form action={handleFormAction}>
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
