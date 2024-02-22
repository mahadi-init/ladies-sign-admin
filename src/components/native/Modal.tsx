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
import React from "react";
import SubmitButton from "./SubmitButton";

/**
 * Renders a modal component with the specified title, description, and children.
 *
 * @param {React.ReactNode} openModalTrigger - The trigger to open the modal
 * @param {string} title - The title of the modal
 * @param {string} [description] - An optional description of the modal
 * @param {React.ReactNode} children - The content to be displayed within the modal
 * @return {JSX.Element} The rendered modal component
 */
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
}): JSX.Element {
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
          <SubmitButton />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
