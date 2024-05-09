import { Badge } from "../ui/badge";

export default function StatusIndicator({
  status,
}: {
  status?: boolean;
}): JSX.Element {
  return (
    <Badge
      variant={status ? "default" : "destructive"}
      className="text-xs font-semibold"
    >
      {status ? "ACTIVE" : "INACTIVE"}
    </Badge>
  );
}
