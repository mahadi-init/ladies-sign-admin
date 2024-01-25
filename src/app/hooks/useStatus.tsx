import { Status } from "@/types/status";
import { useEffect, useState } from "react";

export function useStatus() {
  const [status, setStatus] = useState<Status>(Status.IDLE);

  useEffect(() => {
    const timeout = setTimeout(() => {
      stopLoading();
    }, 3000);

    return clearTimeout(timeout);
  }, [status]);

  const startLoading = () => {
    setStatus(Status.LOADING);
  };

  const setStatusSuccess = () => {
    setStatus(Status.SUCCESS);
  };

  const setStatusError = () => {
    setStatus(Status.ERROR);
  };

  const stopLoading = () => {
    setStatus(Status.IDLE);
  };

  return {
    status,
    startLoading,
    setStatusSuccess,
    setStatusError,
  };
}
