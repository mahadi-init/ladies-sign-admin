import { site } from "@/site-config";

async function updateRequest(url: string, { arg }: { arg: unknown }) {
  const body = JSON.parse(
    JSON.stringify(arg, (_, value) => (value === "" ? undefined : value))
  );

  console.log(body);

  const res = await fetch(`${site.BACKEND_URL}${url}`, {
    method: "PATCH",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  console.log(res);

  const data = await res.json();

  console.log(data);

  return data;
}

export default updateRequest;
