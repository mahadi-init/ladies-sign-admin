import useStatus from "@/hooks/useStatus";
import { Button } from "../ui/button";
import ConfirmationDialog from "./ConfirmationDialog";

export default function ChangeOrderStatus({
  id,
  status,
  color,
}: {
  id?: string;
  status?: string;
  color?: string;
}) {
  // const { trigger, isMutating } = useSWRMutation(
  //   `/order/change-order-status/${id}`,
  //   updateRequest,
  // );
  const { showStatus } = useStatus();

  return (
    <ConfirmationDialog
      alertText="This action will change order status"
      action={async () => {
        let updateValue: string;

        switch (status) {
          case "WAITING":
            updateValue = "PENDING";
            break;
          case "PENDING":
            updateValue = "WAITING";
            break;
          default:
            updateValue = status as string;
        }

        // const res = await trigger({ status: updateValue });
        // await showStatus("/order", "Successfully updated", res);
      }}
    >
      <Button variant={"outline"} className="font-bold">
        {/* {isMutating ? "Loading.." : <p className={color}>{status}</p>} */}
      </Button>
    </ConfirmationDialog>
  );
}
