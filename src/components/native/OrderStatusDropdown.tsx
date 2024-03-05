import { patchData } from "@/actions/patch";
import { BACKEND_URL } from "@/consts/site-info";
import { OrderStatusType } from "@/types/order-status";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import DropdownSelect from "./DropdownSelect";
import OrderStatusIndicator from "./OrderStatusIndicator";

export default function OrderStatusDropdown({
  id,
  status,
}: {
  id: string;
  status: string;
}) {
  const options = ["delivered", "cancelled"];
  const [option, setOption] = useState(status);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    const updateStatus = async () => {
      try {
        const res = await patchData(
          {
            status: option,
          },
          `${BACKEND_URL}/api/order/update-status/${id}`,
          "orders",
          "Order added Successfully"
        );

        if (res.status === 200) {
          toast.success("Status updated successfully");
        }
      } catch (err) {
        toast.error("Status updated failed");
      }
    };

    if (option !== status) {
      updateStatus();
    }
  }, [id, option, status]);

  return (
    <a className="h-32" onClick={() => setShowOptions(!showOptions)}>
      {showOptions ? (
        <DropdownSelect
          items={options}
          selectedItem={option}
          setSelectedItem={setOption}
        />
      ) : (
        <OrderStatusIndicator status={status as OrderStatusType} />
      )}
    </a>
  );
}
