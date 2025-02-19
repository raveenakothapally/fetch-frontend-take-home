"use server";

import {
  DogSearchResult,
  SearchBreedFormSchema,
  SearchBreedFormState,
} from "@/lib/definitions";
import { cookies } from "next/headers";

const API_HOST = process.env.API_HOST;
const DOG_SEARCH_SIZE = parseInt(process.env.DOG_SEARCH_SIZE || "25", 10);

export async function searchBreed(
  _previousState: SearchBreedFormState,
  formData: FormData
): Promise<SearchBreedFormState> {
  const result = SearchBreedFormSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const breeds = result.data.breeds.split(",");
  const breedsParam = breeds.map((breed) => `breeds=${breed}`).join("&");
  const next = result.data.next ? result.data.next : "";
  const prev = result.data.prev ? result.data.prev : "";

  // Get the sort direction from the form data or use previous state
  const sortDirection = formData.get("sortDirection") || "asc";

  let url;
  if (next) {
    url = updateQueryParams(`${API_HOST}${next}`, {
      sort: `breed:${sortDirection}`,
    });
  } else if (prev) {
    url = updateQueryParams(`${API_HOST}${prev}`, {
      sort: `breed:${sortDirection}`,
    });
  } else {
    url = `${API_HOST}/dogs/search?${breedsParam}&sort=breed:${sortDirection}`;
  }

  const cookieStore = await cookies();
  const response = await fetch(`${url}&size=${DOG_SEARCH_SIZE}`, {
    credentials: "include",
    headers: {
      Accept: "application/json",
      Cookie: `fetch-access-token=${
        cookieStore.get("fetch-access-token")?.value
      }`,
    },
    method: "GET",
  });

  const dogSearchResult: DogSearchResult = await response.json();

  const responseDogs = await fetch(`${API_HOST}/dogs`, {
    body: JSON.stringify(dogSearchResult.resultIds),
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
  const dogs = await responseDogs.json();

  let dogSearchResultNext;
  if (dogSearchResult.next) {
    const nextStartAt = parseInt(
      dogSearchResult.next.match(/from=(\d+)/)![1],
      10
    );
    if (nextStartAt < dogSearchResult.total) {
      dogSearchResultNext = dogSearchResult.next;
    }
  }

  return {
    dogs,
    next: dogSearchResultNext,
    prev: dogSearchResult.prev,
    sortDirection: sortDirection as "asc" | "desc",
    total: dogSearchResult.total,
  };
}

function updateQueryParams(
  url: string,
  params: Record<string, string>
): string {
  const urlObj = new URL(url.startsWith("http") ? url : `${API_HOST}{url}`);

  for (const [key, value] of Object.entries(params)) {
    urlObj.searchParams.set(key, value);
  }

  return url.startsWith("http")
    ? urlObj.toString()
    : `${urlObj.pathname}${urlObj.search}`;
}
