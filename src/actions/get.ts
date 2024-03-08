export default async function getData<T>(
  queryUrl: string,
  revalidate: number = 0,
  tags?: string[]
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
