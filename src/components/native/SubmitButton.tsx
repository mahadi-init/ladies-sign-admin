"use client";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { EnterIcon, ReloadIcon } from "@radix-ui/react-icons";

export default function SubmitButton({ style }: { style?: string }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className={style}>
      {pending ? (
        <>
          <ReloadIcon className="mr-2 w-4 h-4 animate-spin" />
          <span>Please wait</span>
        </>
      ) : (
        <span>Submit</span>
      )}
    </Button>
  );
}
