
async function updateRequest(
  url: string,
  { arg }: { arg: unknown }
) {
  const body = JSON.parse(JSON.stringify(arg, (_, value) =>
    value === '' ? undefined : value
  ));

  const res = await fetch(url, {
    method: "PATCH",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json()
  return data
}

export default updateRequest
