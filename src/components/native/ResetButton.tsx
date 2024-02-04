import { Undo2 } from "lucide-react";
import { Button } from "../ui/button";

export default function ResetButton({ action }: { action: () => void }) {
  return (
    <Button type="button" onClick={action} variant="destructive">
      <span className="flex gap-1 items-center">
        <Undo2 size={20} />
        Reset
      </span>
    </Button>
  );
}
