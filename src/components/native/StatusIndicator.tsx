import { Badge } from "../ui/badge";

type Variant = "default" | "secondary" | "destructive";

export default function StatusIndicator({
  status,
}: {
  status: boolean;
}): JSX.Element {
  const getColor = (): Variant => {
    if (status === true) {
      return "secondary";
    }

    return "destructive";
  };

  return (
    <Badge variant={getColor()} className="text-xs font-semibold">
      {status ? "ACTIVE" : "INACTIVE"}
    </Badge>
  );
}
