import { site } from "@/site-config";

export async function fetcher<T>(
  ...args: [RequestInfo, RequestInit?]
): Promise<T> {
  try {
    const res = await fetch(`${site.BACKEND_URL}${args[0]}`, {
      method: "GET",
      credentials: "include",
    });

    const json = await res.json();
    return json.data;
  } catch (err) {
    throw new Error("Network error");
  }
}
