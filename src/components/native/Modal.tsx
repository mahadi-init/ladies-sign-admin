"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SubmitButton from "./SubmitButton";
import React, { useState } from "react";

export default function Modal({
  openModalTrigger,
  title,
  description,
  children,
}: {
  openModalTrigger: React.ReactNode;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  const [pending, setPending] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>{openModalTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter>
          <SubmitButton pending={pending} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
