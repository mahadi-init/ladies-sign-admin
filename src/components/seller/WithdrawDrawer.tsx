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
import { Textarea } from "@/components/ui/textarea";
import useStatus from "@/hooks/useStatus";
import addRequest from "@/https/add-request";
import { SellerType } from "@/types/seller";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";
import SubmitButton from "../native/SubmitButton";

export default function WithdrawDrawer({ profile }: { profile?: SellerType }) {
  const { register, handleSubmit } = useForm<{
    amount: string;
    bkash: string;
  }>();
  const { trigger, isMutating } = useSWRMutation(`/withdraw/add`, addRequest);
  const { showStatus } = useStatus();

  const onSubmit: SubmitHandler<{
    amount: string;
    bkash: string;
  }> = async (data) => {
    if (
      profile &&
      profile.balance &&
      Number.parseInt(data.amount) > profile?.balance
    ) {
      toast.error("Insufficient balance");
      return;
    }

    const refinedData = {
      ...data,
      message: "Hello sir, i am sending you withdraw request",
      seller: profile?._id,
    };

    const res = await trigger(refinedData);
    await showStatus("/withdraw", "Withdraw request sent successfully", res);
  };

  return (
    <Drawer>
      <DrawerTrigger className={buttonVariants({ variant: "destructive" })}>
        Withdraw
      </DrawerTrigger>
      <DrawerContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto w-full max-w-sm"
        >
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>
              You sending a withdraw request
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

            <Label htmlFor="bkash">
              Bkash Number
              <Input
                id="bkash"
                type="text"
                placeholder="01312345678"
                defaultValue={profile?.phone}
                className="mt-2"
                {...register("bkash", { required: true })}
              />
            </Label>

            <Label htmlFor="message">
              Message
              <Textarea
                id="amount"
                name="amount"
                defaultValue={`Hello sir, i am sending you withdraw request`}
                rows={3}
                className="mt-2"
                disabled
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
