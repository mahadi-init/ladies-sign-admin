import { site } from "@/site-config";

async function deleteRequest(url: string) {
  try {
    const res = await fetch(`${site.BACKEND_URL}${url}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await res.json();
    return data;
  } catch (err) {
    return err;
  }
}

export default deleteRequest;
