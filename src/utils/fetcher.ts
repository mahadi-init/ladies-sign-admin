import { siteConfig } from "@/site-info";

export async function fetcher<T>(
  ...args: [RequestInfo, RequestInit?]
): Promise<T> {
  const response = await fetch(`${siteConfig.BACKEND_URL}${args[0]}`, args[1] || {});
  const json = await response.json();

  return json.data
}
