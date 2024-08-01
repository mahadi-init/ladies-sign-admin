import { Badge } from "flowbite-react";

export default function StatusIndicator({
  status,
  updateStatusUrl,
  mutationTag,
  variant,
  text,
}: {
  status?: boolean;
  updateStatusUrl: string;
  mutationTag: string;
  variant?: "default" | "destructive" | "outline" | "secondary";
  text?: string;
}): JSX.Element {
  // const { showStatus } = useStatus();
  // const { trigger, isMutating } = useSWRMutation(
  //   updateStatusUrl,
  //   updateRequest,
  // );

  const handleOnClick = async () => {
    // const res = await trigger({ status: !status });
    // await showStatus(mutationTag as string, "Status updated successfully", res);
  };

  return (
    <Badge
      color={!variant ? (status ? "" : "failure") : "dark"}
      className="w-fit cursor-pointer rounded-lg text-xs font-semibold"
      onClick={handleOnClick}
    >
      {/* {isMutating ? "UPDATING.." : (text ?? (status ? "ACTIVE" : "INACTIVE"))} */}
    </Badge>
  );
}
