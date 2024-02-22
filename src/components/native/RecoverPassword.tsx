import Modal from "@/components/native/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/**
 * Renders a modal for recovering password.
 */
export default function RecoverPassword() {
  return (
    <Modal
      title="Recover Password"
      description="By entering the email address you recover the account "
      openModalTrigger={
        <Button type="button" variant="link" className="text-blue-600">
          Forget password?
        </Button>
      }
    >
      <div className="space-y-5">
        <div>
          <label
            htmlFor="email"
            className="text-base font-medium text-gray-900"
          >
            Email
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="xyz@gmail.com"
              className="mt-2.5"
            />
          </label>
        </div>
      </div>
    </Modal>
  );
}
