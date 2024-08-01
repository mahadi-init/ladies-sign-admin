import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import useStatus from "@/hooks/useStatus";
import { OrderType } from "@/types/order";
import React from "react";

export default function OrderConfirmationDialog({
  alertText,
  children,
  data,
}: {
  alertText: string;
  children: React.ReactNode;
  data: OrderType;
}): React.ReactElement {
  // const { trigger, isMutating } = useSWRMutation(
  //   "/order/send-order",
  //   addRequest,
  // );
  const { showStatus } = useStatus();

  // useEffect(() => {
  //   if (isMutating) {
  //     toast.loading("Order sending...");
  //   } else {
  //     toast.dismiss();
  //   }
  // }, [isMutating]);

  const handleSubmit = async () => {
    // const res = await trigger(data);
    // await showStatus("/order", "Order send successully", res);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>{alertText}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
