import { site } from "@/site-config";

async function updateRequest(url: string, { arg }: { arg: unknown }) {
  const body = JSON.parse(
    JSON.stringify(arg, (_, value) => (value === "" ? undefined : value)),
  );

  try {
    const res = await fetch(`${site.BACKEND_URL}${url}`, {
      method: "PATCH",
      body: JSON.stringify(body),
      // credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${site.bearer_token}`,
      },
    });

    const data = await res.json();
    return data;
  } catch (err) {
    return err;
  }
}

export default updateRequest;
