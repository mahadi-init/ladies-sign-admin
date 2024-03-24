export default async function getData<T>(
  queryUrl: string,
  hasNestedData = false,
  revalidate: number = 0,
  tags?: string[]
): Promise<T> {
  const res = await fetch(queryUrl, {
    next: {
      revalidate: revalidate,
      tags: tags,
    },
  });
  const value = await res.json();

  if (hasNestedData) {
    return value.data;
  } else {
    return value;
  }
}
