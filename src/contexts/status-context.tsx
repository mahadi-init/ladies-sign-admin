import { Status } from "@/types/status";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

type StatusContextType = {
  status: Status;
  setStatus: (status: Status) => void;
};

export const StatusContext = createContext<StatusContextType>({
  status: Status.IDLE,
  setStatus: () => {},
});

export function useStatusContext(event: string = "Event") {
  const [status, setStatus] = useState<Status>(Status.IDLE);

  useEffect(() => {
    if (status == Status.LOADING) {
      toast(`Loading...`, {
        isLoading: true,
      });
    }

    if (status == Status.SUCCESS) {
      toast.dismiss();
      toast.success(`${event} Successful`);
    }

    if (status === Status.ERROR) {
      toast.dismiss();
      toast.error(`${event} Failed`);
    }

    const timeout = setTimeout(() => {
      setStatus(Status.IDLE);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [event, status]);

  return {
    status,
    setStatus,
  };
}
