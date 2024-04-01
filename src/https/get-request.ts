
import { siteConfig } from "@/site-info";

export async function fetcher<T>(
  ...args: [RequestInfo, RequestInit?]
): Promise<T> {
  try {
    const res = await fetch(
      `${siteConfig.BACKEND_URL}${args[0]}`,
      {
        method: "GET",
        credentials: "include",
      },
    );

    const json = await res.json();
    return json.data
  } catch (err) {
    throw new Error("Network error")
  }
}
