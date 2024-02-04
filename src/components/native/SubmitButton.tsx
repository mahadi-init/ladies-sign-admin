"use client";
import { Button } from "../ui/button";
import { EnterIcon, ReloadIcon } from "@radix-ui/react-icons";

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
        <>
          <EnterIcon className="mr-2 w-4 h-4" /> Submit
        </>
      )}
    </Button>
  );
}
