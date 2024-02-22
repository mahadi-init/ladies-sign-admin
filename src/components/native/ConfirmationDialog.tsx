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
import React from "react";

/**
 * Renders a confirmation dialog with the given alert text and children, and handles the provided action.
 *
 * @param {string} alertText - The text to be displayed in the confirmation dialog alert
 * @param {React.ReactNode} children - The content to be displayed in the confirmation dialog
 * @param {() => void} action - The action to be performed upon confirmation
 * @return {React.ReactElement} The confirmation dialog component
 */
export default function ConfirmationDialog({
  alertText,
  children,
  action,
}: {
  alertText: string;
  children: React.ReactNode;
  action: () => void;
}): React.ReactElement {
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
          <AlertDialogAction onClick={action}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
