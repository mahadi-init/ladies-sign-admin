import { getAuthCookie } from "@/helpers/get-auth";
import { site } from "@/site-config";

async function addRequest(url: string, { arg }: { arg: unknown }) {
  const body = JSON.parse(
    JSON.stringify(arg, (_, value) => (value === "" ? undefined : value))
  );

  const auth = getAuthCookie();

  try {
    const res = await fetch(`${site.BACKEND_URL}${url}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth}`,
      },
      // credentials: "include",
    });

    const data = await res.json();
    return data;
  } catch (err) {
    return err;
  }
}

export default addRequest;
