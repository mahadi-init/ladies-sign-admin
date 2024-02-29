import { OrderStatusType } from "@/types/order-status";
import { Badge } from "../ui/badge";

type BadgeVariants = "default" | "outline" | "secondary" | "destructive";

export default function OrderStatusIndicator({
  status,
}: {
  status: OrderStatusType;
}) {
  const getVariant = () => {
    let variant: BadgeVariants;

    switch (status) {
      case OrderStatusType.Pending:
        variant = "default";
        break;
      case OrderStatusType.Processing:
        variant = "secondary";
        break;
      case OrderStatusType.Delivered:
        variant = "outline";
        break;
      default:
        variant = "destructive";
    }

    return variant;
  };

  return <Badge variant={getVariant()}>{status}</Badge>;
}
