import { Button } from "../ui/button";
import { ResetIcon } from "@radix-ui/react-icons";

export default function ResetButton({ action }: { action: () => void }) {
  return (
    <Button type="button" onClick={action} variant="destructive">
      <span className="flex gap-1 items-center">
        <ResetIcon className="mr-2 w-4 h-4" /> Reset
      </span>
    </Button>
  );
}
