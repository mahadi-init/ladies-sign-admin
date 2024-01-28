import { Status } from "@/types/status";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

type StatusContextType = {
  startLoading: () => void;
  setSuccessStatus: (status: Status) => void;
  setErrorStatus: (status: Status) => void;
};

export const StatusContext = createContext<StatusContextType>({
  startLoading: () => {},
  setSuccessStatus: () => {},
  setErrorStatus: () => {},
});

export function useStatusContext() {
  const [status, setStatus] = useState<Status>(Status.IDLE);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStatus(Status.IDLE);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [status]);

  const startLoading = () => {
    setStatus(Status.LOADING);

    toast(`Loading...`, {
      isLoading: true,
    });
  };

  const setSuccessStatus = (message: string) => {
    toast.dismiss();

    setStatus(Status.SUCCESS);
    toast.success(message);
  };

  const setErrorStatus = (message: string) => {
    toast.dismiss();

    setStatus(Status.ERROR);
    toast.error(message);
  };

  return {
    startLoading,
    setSuccessStatus,
    setErrorStatus,
  };
}
