import {
  CircleOff,
  LayoutDashboard,
  Loader,
  Package,
  PartyPopper,
} from "lucide-react";

export const statuses = [
  {
    title: "ALL",
    icon: <LayoutDashboard size={18} />,
  },
  {
    title: "PENDING",
    icon: <Loader size={18} />,
  },
  {
    title: "PROCESSING",
    icon: <Package size={18} />,
  },
  {
    title: "DELIVERED",
    icon: <PartyPopper size={18} />,
  },
  {
    title: "CANCELLED",
    icon: <CircleOff size={18} />,
  },
] as const;
