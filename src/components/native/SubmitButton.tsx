"use client";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "flowbite-react";

interface SubmitButtonProps {
  text: string;
  style: string;
  isMutating: boolean;
}

export default function SubmitButton({
  isMutating,
  text,
  style,
}: Partial<SubmitButtonProps>): JSX.Element {
  return (
    <Button
      color="success"
      type="submit"
      disabled={isMutating}
      className={style}
    >
      {isMutating ? (
        <>
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          <span>Please wait</span>
        </>
      ) : (
        <span>{text ?? "Submit"}</span>
      )}
    </Button>
  );
}
