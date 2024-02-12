import { Button } from "@/components/ui/button";
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

export default function BottomDrawer({
  drawerTrigger,
}: {
  drawerTrigger: React.ReactNode;
}) {
  return (
    <Drawer>
      <DrawerTrigger>{drawerTrigger}</DrawerTrigger>
      <DrawerContent>
        <form className="mx-auto w-full max-w-sm">
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
                name="amount"
                type="number"
                placeholder="3000"
                className="mt-2"
                required
              />
            </Label>
            <Label htmlFor="amount">
              Bkash
              <Input
                id="amount"
                name="amount"
                type="tel"
                placeholder="01312345678"
                className="mt-2"
                required
              />
            </Label>
            <Label htmlFor="message">
              Message
              <Textarea
                id="amount"
                name="amount"
                placeholder="Hello, sir i am sending you withdraw request"
                rows={3}
                className="mt-2"
                required
              />
            </Label>
          </div>
          <DrawerFooter>
            <Button type="submit">Submit</Button>
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
