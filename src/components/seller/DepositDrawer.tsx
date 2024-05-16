import { Button, buttonVariants } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useSWRMutation from "swr/mutation";
import addRequest from "@/https/add-request";
import { site } from "@/site-config";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { SellerType } from "@/types/seller.t";
import { BkashPayment } from "@/types/bkash.t";
import { toast } from "sonner";
import SubmitButton from "../native/SubmitButton";

export default function DepositDrawer({ profile }: { profile?: SellerType }) {
  const router = useRouter();
  const { register, handleSubmit } = useForm<{
    amount: string;
    reference: string;
  }>();
  const { trigger, isMutating } = useSWRMutation(
    `/bkash/create-payment`,
    addRequest,
  );

  // FIXME: FIX BKASH SHOWING UNAUTHORIZED ISSUE
  const onSubmit: SubmitHandler<{ amount: string; reference: string }> = async (
    data,
  ) => {
    const customData = {
      mode: "0011",
      payerReference: data.reference,
      callbackURL: `${site.BACKEND_URL}/bkash/execute-payment/seller/${profile?._id}`,
      amount: data.amount.toString(),
      currency: "BDT",
      intent: "sale",
      merchantInvoiceNumber: profile?.cid?.toString(),
    };
    const res: { success: boolean; data: BkashPayment } =
      await trigger(customData);

    if (!res.success) {
      toast.error("Something went wrong");
      return;
    }

    router.push(res.data.bkashURL);
  };

  return (
    <Drawer>
      <DrawerTrigger className={buttonVariants({ variant: "default" })}>
        Deposit
      </DrawerTrigger>
      <DrawerContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-sm mx-auto"
        >
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>
              You sending a Deposite request
            </DrawerDescription>
          </DrawerHeader>

          <div className="flex flex-col gap-4 p-4 pb-0">
            <Label htmlFor="amount">
              Amount
              <Input
                id="amount"
                type="number"
                placeholder="3000"
                className="mt-2"
                {...register("amount", { required: true })}
              />
            </Label>

            <Label htmlFor="ref">
              Reference
              <Input
                id="ref"
                type="text"
                placeholder="01312345678"
                className="mt-2"
                {...register("reference", { required: true })}
              />
            </Label>
          </div>

          <DrawerFooter>
            <SubmitButton isMutating={isMutating} text="Submit" />
            <DrawerClose>
              <Button className="w-full" variant="outline">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
