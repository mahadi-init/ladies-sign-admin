"use client";
import { PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function SubmitButton({
  pending,
  style,
}: {
  pending: boolean;
  style?: string;
}) {
  return (
    <Button type="submit" disabled={pending} className={style}>
      {pending ? (
        <>
          <ReloadIcon className="mr-2 w-4 h-4 animate-spin" />
          <span>Please wait</span>
        </>
      ) : (
        <div className="flex gap-1 items-center">
          <PlusCircle size={20} />
          <span>Submit</span>
        </div>
      )}
    </Button>
  );
}
