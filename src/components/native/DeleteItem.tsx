import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import DeleteButton from "@/components/native/DeleteButton";
import { Response } from "@/types/response";
import { toast } from "sonner";

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
    <form action={handleFormAction}>
      {!isConfirmed && (
        <Button
          type="button"
          size="icon"
          className="w-6 h-6"
          onClick={() => setIsConfirmed(true)}
        >
          <Trash2 size={16} />
        </Button>
      )}
      {isConfirmed && <DeleteButton />}
    </form>
  );
}
