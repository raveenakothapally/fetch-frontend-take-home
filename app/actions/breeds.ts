import { cookies } from "next/headers";

const API_HOST = process.env.API_HOST;

export async function getAllBreeds(): Promise<string[]> {
  const cookieStore = await cookies();
  const response = await fetch(`${API_HOST}/dogs/breeds`, {
    credentials: "include",
    headers: {
      Accept: "application/json",
      Cookie: `fetch-access-token=${
        cookieStore.get("fetch-access-token")?.value
      }`,
    },
    method: "GET",
  });

  return response.json();
}
