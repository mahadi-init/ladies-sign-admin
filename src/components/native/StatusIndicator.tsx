import { Status } from "@/types/enums.t";
import { Badge } from "../ui/badge";

type Variant = "default" | "secondary" | "destructive";

export default function StatusIndicator({
  status,
}: {
  status: Status;
}): JSX.Element {
  const getColor = (): Variant => {
    if (status === "ACTIVE" || status === "SHOW") {
      return "secondary";
    } else {
      return "destructive";
    }
  };

  return (
    <Badge variant={getColor()} className="text-xs font-semibold">
      {status}
    </Badge>
  );
}
