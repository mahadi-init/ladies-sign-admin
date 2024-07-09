import { withdrawColumn } from "@/columns/WithdrawColumn";
import PageTop from "@/components/native/PageTop";
import UIWrapperWithStatus from "@/ui/UIWrapperWithStatus";

export default function Withdraw() {
  return (
    <div>
      <PageTop title="Withdraw" />
      <UIWrapperWithStatus route="/withdraw" columns={withdrawColumn} />
    </div>
  );
}
