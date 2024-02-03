import { Button } from "../ui/button";

export default function ResetButton({ action }: { action: () => void }) {
  return (
    <Button type="button" onClick={action} variant="destructive">
      Reset
    </Button>
  );
}
