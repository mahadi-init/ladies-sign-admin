import { LayoutDashboard, ShieldBan, ShieldCheck } from "lucide-react";

export const Statuses = [
  {
    title: "ALL",
    icon: <LayoutDashboard size={18} />,
  },
  {
    title: "ACTIVE",
    icon: <ShieldCheck size={18} />,
  },
  {
    title: "INACTIVE",
    icon: <ShieldBan size={18} />,
  },
] as const;
