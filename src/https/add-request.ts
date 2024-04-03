import { site } from "@/site-config";

async function addRequest(url: string, { arg }: { arg: unknown }) {
  const body = JSON.parse(
    JSON.stringify(arg, (_, value) => (value === "" ? undefined : value))
  );

  //FIXME: REMOVE
  console.log(body);

  const res = await fetch(`${site.BACKEND_URL}${url}`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  //FIXME: REMOVE
  console.log(res);

  const data = await res.json();
  //FIXME: REMOVE
  console.log(data);

  return data;
}

export default addRequest;
