import { site } from "@/site-config";

export async function fetcher<T>(
  ...args: [RequestInfo, RequestInit?]
): Promise<T> {
  try {
    const res = await fetch(`${site.BACKEND_URL}${args[0]}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${site.bearer_token}`,
      },
    });

    const json = await res.json();
    return json.data;
  } catch (err) {
    throw new Error("Network error");
  }
}
