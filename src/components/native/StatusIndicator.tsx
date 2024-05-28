import useSWRMutation from "swr/mutation";
import { Badge } from "../ui/badge";
import updateRequest from "@/https/update-request";
import useStatus from "@/hooks/useStatus";

export default function StatusIndicator({
  status,
  updateStatusUrl,
  mutationTag,
}: {
  status?: boolean;
  updateStatusUrl: string;
  mutationTag: string;
}): JSX.Element {
  const { showStatus } = useStatus();
  const { trigger, isMutating } = useSWRMutation(
    updateStatusUrl,
    updateRequest,
  );

  const handleOnClick = async () => {
    const res = await trigger({ status: !status });
    showStatus(mutationTag as string, "Status updated successfully", res);
  };

  return (
    <Badge
      variant={status ? "default" : "destructive"}
      className="text-xs font-semibold cursor-pointer"
      onClick={handleOnClick}
    >
      {!isMutating && status ? "ACTIVE" : "INACTIVE"}
      {isMutating && "UPDATING.."}
    </Badge>
  );
}