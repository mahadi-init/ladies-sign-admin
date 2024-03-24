import { LocalResponse } from "@/types/response.t";
import { toast } from "sonner";

export default function showToast(res: LocalResponse) {
  if (res.status === 200) {
    toast.success(res.message);
  } else {
    toast.error(res.message);
  }
}
