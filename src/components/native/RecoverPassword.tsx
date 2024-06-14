"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function RecoverPassword() {
  //TODO:IMPLEMENT

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="link" className="text-blue-600">
          Forget password?
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Recover Password</DialogTitle>
          <DialogDescription>
            By entering the email address you can recover the account
          </DialogDescription>
        </DialogHeader>
        <Input placeholder="Enter your email" />
      </DialogContent>
    </Dialog>
  );
}
