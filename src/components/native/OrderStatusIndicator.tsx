import { OrderStatusType } from "@/types/enums.t";
import { Badge } from "../ui/badge";

type BadgeVariants = "default" | "outline" | "secondary" | "destructive";

export default function OrderStatusIndicator({
  status,
}: {
  status: OrderStatusType;
}) {
  const getVariant = (): BadgeVariants => {
    let variant: BadgeVariants;

    switch (status) {
      case "PENDING":
        variant = "default";
        break;
      case "PROCESSING":
        variant = "secondary";
        break;
      case "DELIVERED":
        variant = "outline";
        break;
      default:
        variant = "destructive";
    }

    return variant;
  };

  return <Badge variant={getVariant()}>{status}</Badge>;
}
