import { Status } from "@/types/status";
import { Badge } from "../ui/badge";

enum Variant {
  default = "default",
  secondary = "secondary",
  destructive = "destructive",
}

/**
 * StatusIndicator component that displays the status with different colors based on the status value.
 *
 * @param {Status} status - the status value to display
 * @return {JSX.Element} a paragraph element with the appropriate class for the status color
 */
export default function StatusIndicator({
  status,
}: {
  status: Status;
}): JSX.Element {
  const getColor = (): Variant => {
    const lowercaseStatus = status?.toLowerCase();

    if (lowercaseStatus === Status.Active || lowercaseStatus === Status.Show) {
      return Variant.secondary;
    } else if (lowercaseStatus === Status.Inactive) {
      return Variant.default;
    } else {
      return Variant.destructive;
    }
  };

  return (
    <Badge variant={getColor()} className="text-xs font-semibold">
      {status}
    </Badge>
  );
}
