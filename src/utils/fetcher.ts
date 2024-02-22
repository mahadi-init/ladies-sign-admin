/**
 * Asynchronous function to fetch data.
 *
 * @param {RequestInfo} args[0] - The URL or object of the resource to be fetched.
 * @param {RequestInit} args[1] - An optional object containing any custom settings that you want to apply to the request.
 * @return {Promise<T>} A promise that resolves with the parsed JSON body of the response.
 */
export async function fetcher<T>(
  ...args: [RequestInfo, RequestInit?]
): Promise<T> {
  const response = await fetch(...args);
  return response.json();
}
