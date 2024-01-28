"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Check } from "lucide-react";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      size="icon"
      variant="destructive"
      className="h-6 w-6"
      disabled={pending}
    >
      {!pending ? (
        <Check size={16} />
      ) : (
        <ReloadIcon className="h-4 w-4 animate-spin" />
      )}
    </Button>
  );
}
