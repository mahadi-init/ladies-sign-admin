
async function deleteRequest(
  url: string,
) {
  const res = await fetch(url, {
    method: "DELETE",
  });

  const data = await res.json()
  return data
}

export default deleteRequest
