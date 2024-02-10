export async function fetcher<T>(
  ...args: [RequestInfo, RequestInit?]
): Promise<T> {
  const response = await fetch(...args);
  return response.json();
}
