/**
Fetches data from a specified URL.
@template T - The type of the data to be returned.
@param {string} queryUrl - The URL to fetch the data from.
@param {number} [revalidate] - The time in seconds to revalidate the data.
@param {string[]} [tags] - The tags which will be used revalidate the fetch data
@returns {Promise<T>} - A promise that resolves to the fetched data.
*/
export default async function getData<T>(
  queryUrl: string,
  revalidate: number = 0,
  tags?: string[],
): Promise<T> {
  const res = await fetch(queryUrl, {
    next: {
      revalidate: revalidate,
      tags: tags,
    },
  });
  const data = await res.json();

  return data;
}
