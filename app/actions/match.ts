"use server";

import { Match, MatchFormSchema, MatchFormState } from "@/lib/definitions";
import { cookies } from "next/headers";

const API_HOST = process.env.API_HOST;

export async function match(
  _previousState: MatchFormState,
  formData: FormData
): Promise<MatchFormState> {
  const formDogs = Object.fromEntries(formData);
  if (!formDogs) {
    return {
      errorMessage: "No dogs selected",
    };
  }

  const dogs = JSON.parse(formDogs["dogs"] as string);

  const result = MatchFormSchema.safeParse({ dogs });
  if (!result.success) {
    return {
      errorMessage: result.error.flatten().formErrors.join(", "),
    };
  }
  const cookieStore = await cookies();

  const response = await fetch(`${API_HOST}/dogs/match`, {
    body: JSON.stringify(result.data.dogs.map((dog) => dog.id)),
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Cookie: `fetch-access-token=${
        cookieStore.get("fetch-access-token")?.value
      }`,
    },
    method: "POST",
  });
  const matchedDog: Match = await response.json();

  return {
    dog: result.data.dogs.find((dog) => dog.id === matchedDog.match),
  };
}
