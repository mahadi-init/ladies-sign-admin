async function addRequest(
  url: string,
  { arg }: { arg: unknown }
) {

  const body = JSON.parse(JSON.stringify(arg, (_, value) =>
    value === '' ? undefined : value
  ));

  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include',
  });

  const data = await res.json()
  return data
}

export default addRequest
