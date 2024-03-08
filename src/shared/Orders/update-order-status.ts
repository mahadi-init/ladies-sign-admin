import { patchData } from "@/actions/patch";
import { toast } from "sonner";
import { BACKEND_URL } from "../../../site-info";

export const updateOrderStatus = async <T>(id: string, item: T) => {
  console.log(item);

  const res = await patchData(
    {
      status: item,
    },
    `${BACKEND_URL}/api/order/update-status/${id}`,
    "orders",
    "Status updated Successfully"
  );

  if (res.status === 200) {
    toast.success(res.message);
  } else {
    toast.error(res.message);
  }
};
