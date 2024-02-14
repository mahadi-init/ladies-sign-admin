import { Status } from "@/types/status";
import clsx from "clsx";

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
