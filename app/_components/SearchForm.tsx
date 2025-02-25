"use client";

import { SortToggle } from "@/_components/SortToggle";
import { ActionIcon, MultiSelect } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { track } from "@vercel/analytics";
import { useRef, useState } from "react";

interface SearchFormProps {
  availableBreeds: string[];
  errors?: any;
  pending: boolean;
  searchBreedsAction: any;
  selectedBreeds?: string[];
  sortDirection?: "asc" | "desc";
}

export function SearchForm({
  availableBreeds,
  errors,
  pending,
  searchBreedsAction,
  selectedBreeds = [],
  sortDirection = "asc",
}: SearchFormProps) {
  const [currentSortDirection, setCurrentSortDirection] =
    useState(sortDirection);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSortDirectionChange = (newDirection: "asc" | "desc") => {
    setCurrentSortDirection(newDirection);

    if (formRef.current) {
      const formData = new FormData(formRef.current);
      formData.set("sortDirection", newDirection);

      if (formData.get("breeds")) {
        const submitBtn = formRef.current.querySelector(
          "button[type='submit']"
        );
        if (submitBtn) {
          setTimeout(() => {
            (submitBtn as HTMLButtonElement).click();
          });
        }
      }
    }
  };

  const sanitizedBreeds = availableBreeds.map((breed) =>
    typeof breed === "string" ? breed : String(breed)
  );

  const sanitizedSelectedBreeds = selectedBreeds.map((breed) =>
    typeof breed === "string" ? breed : String(breed)
  );

  return (
    <div className="sticky top-0 z-20 pb-4 bg-white/95 backdrop-blur-sm border-b shadow-sm w-full">
      <div className="flex flex-col px-8 w-full space-y-2 max-w-[600px] mx-auto">
        <form
          action={searchBreedsAction}
          className="flex flex-col w-full space-y-4"
          ref={formRef}
          role="search"
        >
          <label className="sr-only" htmlFor="breeds-select">
            Search dog breeds
          </label>

          <div className="relative">
            <MultiSelect
              aria-label="Search breeds"
              data={sanitizedBreeds}
              defaultValue={sanitizedSelectedBreeds}
              disabled={pending}
              error={errors?.breeds}
              errorProps={{ "aria-live": "assertive", role: "alert" }}
              id="breeds-select"
              name="breeds"
              placeholder="Search for breed"
              rightSection={
                <ActionIcon
                  aria-disabled={pending}
                  aria-label="Search for dogs"
                  className="rounded-full cursor-pointer z-10 shadow-md"
                  disabled={pending}
                  gradient={{ deg: 90, from: "blue", to: "violet" }}
                  loading={pending}
                  type="submit"
                  variant="gradient"
                  onClick={() =>
                    track("search-dogs", { breeds: selectedBreeds.join(",") })
                  }
                >
                  <IconSearch aria-hidden="true" className="p-1" />
                </ActionIcon>
              }
              rightSectionPointerEvents="auto"
              searchable
            />
          </div>

          <input
            name="sortDirection"
            type="hidden"
            value={currentSortDirection}
          />
        </form>

        {sanitizedSelectedBreeds.length > 0 && (
          <div className="flex justify-end mt-2">
            <SortToggle
              direction={currentSortDirection}
              disabled={pending}
              onChange={handleSortDirectionChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
