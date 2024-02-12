"use client";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function SubmitButton({
  text,
  style,
}: {
  text?: string;
  style?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className={style}>
      {pending ? (
        <>
          <ReloadIcon className="mr-2 w-4 h-4 animate-spin" />
          <span>Please wait</span>
        </>
      ) : (
        <span>{text ?? "Submit"}</span>
      )}
    </Button>
  );
}
