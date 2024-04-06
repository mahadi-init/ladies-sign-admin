"use client";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";

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
    <Button type="submit" disabled={isMutating} className={style}>
      {isMutating ? (
        <>
          <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />
          <span>Please wait</span>
        </>
      ) : (
        <span>{text ?? "Submit"}</span>
      )}
    </Button>
  );
}
