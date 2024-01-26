const getCategoryData = async (id: string) => {};

export default async function EditCategory({
  params,
}: {
  params: { id: string };
}) {
  const data = await getCategoryData(params.id);

  return <></>;
}
