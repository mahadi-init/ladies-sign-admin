import { Button } from "../ui/button";
import ConfirmationDialog from "./ConfirmationDialog";
import useSWRMutation from "swr/mutation";
import updateRequest from "@/https/update-request";
import useStatus from "@/hooks/useStatus";
import clsx from "clsx";

export default function ChangeStatus({
  status,
  route,
  mutationTag,
}: {
  status?: string;
  route: string;
  mutationTag: string;
}) {
  const { trigger, isMutating } = useSWRMutation(route, updateRequest);
  const { showStatus } = useStatus();

  return (
    <ConfirmationDialog
      alertText="This action will change status"
      action={async () => {
        let updateValue: string;

        if (status === "PENDING") {
          updateValue = "DONE";
        } else {
          updateValue = "PENDING";
        }

        const res = await trigger({ status: updateValue });
        await showStatus(mutationTag, "Successfully updated", res);
      }}
    >
      <Button variant={"outline"} className="font-bold">
        {isMutating ? (
          "Loading.."
        ) : (
          <p
            className={clsx(
              status === "DONE" ? "text-green-700" : "text-red-700",
            )}
          >
            {status}
          </p>
        )}
      </Button>
    </ConfirmationDialog>
  );
}