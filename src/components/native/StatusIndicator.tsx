import { Status } from "@/types/status";
import clsx from "clsx";

export default function StatusIndicator({ status }: { status: Status }) {
  const getColor = () => {
    if (status === Status.active) {
      return "text-green-600";
    } else if (status === Status.inactive) {
      return "text-yellow-600";
    } else {
      return "text-red-600";
    }
  };

  return <p className={clsx("text-sm font-semibold", getColor())}>{status}</p>;
}
