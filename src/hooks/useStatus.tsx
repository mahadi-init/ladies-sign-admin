import { toast } from "sonner";
import { useSWRConfig } from "swr";

export default function useStatus() {
  const { mutate } = useSWRConfig();

  const showStatus = async(
    mutationTag: string,
    successMessage: string,
    res: { success: boolean; message?: string },
  ) => {
    if (res.success) {
      await mutate(
        (key) => typeof key === "string" && key.startsWith(mutationTag),
        undefined,
        { revalidate: true },
      );
      toast.success(successMessage);
    } else {
      toast.error(res?.message);
    }
  };

  return {
    showStatus,
  };
}
