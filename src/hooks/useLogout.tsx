import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function useLogout() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      deleteCookie("auth");
      router.replace("/");
    } catch (err) {
      return err;
    }
  };

  return { handleLogout };
}
