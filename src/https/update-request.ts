import { site } from "@/site-config";

async function updateRequest(
  url: string,
  { arg }: { arg: unknown }
) {
  const body = JSON.parse(JSON.stringify(arg, (_, value) =>
    value === '' ? undefined : value
  ));

  const res = await fetch(`${site.BACKEND_URL}${url}`, {
    method: "PATCH",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include"
  });

  const data = await res.json()
  return data
}

export default updateRequest
