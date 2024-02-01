import { BACKEND_URL } from "@/consts/site-info";

export const getAdmins = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/admin/all`, {
      next: {
        tags: ["admin", "admins"],
        revalidate: 300,
      },
    });
    const data = await res.json();

    return data.data;
  } catch (err) {
    throw new Error("Failed fetching admins");
  }
};
