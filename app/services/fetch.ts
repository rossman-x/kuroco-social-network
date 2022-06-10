import { redirect } from "@remix-run/node";

export const postData = async (
  endpoint: string,
  body: any,
  authRequired = true
) => {
  const fetchResponse = await fetch(endpoint, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json",
      ...(authRequired &&
        localStorage.getItem("token") && {
          "X-RCMS-API-ACCESS-TOKEN": localStorage.getItem("token") ?? undefined,
        }),
    },
  });
  if (!fetchResponse.ok) {
    if (fetchResponse.status === 401 && authRequired)
      window.location.href = "/login";
    throw new Error(`Cannot fetch data, error code: ${fetchResponse.status}`);
  }
  return await fetchResponse.json();
};

export const getData = async (endpoint: string, authRequired = true) => {
  const fetchResponse = await fetch(endpoint, {
    method: "GET",
    headers: {
      ...(authRequired &&
        localStorage.getItem("token") && {
          "X-RCMS-API-ACCESS-TOKEN": localStorage.getItem("token") ?? undefined,
        }),
    },
  });
  if (!fetchResponse.ok) {
    if (fetchResponse.status === 401 && authRequired)
      window.location.href = "/login";
    throw new Error(`Cannot fetch data, error code: ${fetchResponse.status}`);
  }
  return await fetchResponse.json();
};
