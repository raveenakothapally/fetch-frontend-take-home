"use client";

import DogCard from "@/_components/DogCard";
import { FavoritesIndicator } from "@/_components/FavoritesIndicator";
import FavouritesModal from "@/_components/FavouritesModal";
import { Pagination } from "@/_components/Pagination";
import { SearchForm } from "@/_components/SearchForm";
import { useFavorites } from "@/_hooks/useFavorites";
import { searchBreed } from "@/actions/search";
import { Button, Text } from "@mantine/core";
import { IconDog, IconHeart } from "@tabler/icons-react";
import { useActionState, useEffect, useRef, useState } from "react";

interface HomeClientProps {
  availableBreeds: string[];
}

export default function HomeClient({ availableBreeds }: HomeClientProps) {
  const [state, searchBreedsAction, pending] = useActionState(searchBreed, {});
  const { clearFavorites, favorites, isFavorite, toggleFavorite } =
    useFavorites();
  const [isFavouritesOpened, setIsFavouritesOpened] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state?.dogs?.length && !pending) {
      resultsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [state?.dogs, pending]);

  return (
    <div className="flex flex-col relative">
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm pb-4 w-full">
        <div className="hidden md:block absolute right-8 top-8 z-30">
          <FavoritesIndicator
            favorites={favorites || []}
            onClick={() => setIsFavouritesOpened(true)}
          />
        </div>
        <SearchForm
          availableBreeds={availableBreeds}
          errors={state?.errors}
          pending={pending}
          searchBreedsAction={searchBreedsAction}
          selectedBreeds={state?.dogs?.map((dog) => dog.breed) || []}
          sortDirection={state?.sortDirection || "asc"}
        />
      </div>

      {/* Skip to content link */}
      <a
        className="sr-only focus:not-sr-only focus:absolute z-50 p-2 bg-white"
        href="#dog-results"
      >
        Skip to dog results
      </a>
      {/* Search results */}
      <section
        aria-label="Search results"
        aria-live="polite"
        className="flex-1 overflow-y-auto"
        id="dog-results"
        ref={resultsRef}
      >
        {state.dogs && state?.dogs?.length > 0 ? (
          <div className="max-w-[1200px] mx-auto">
            <ul
              className="flex flex-wrap items-center justify-center gap-6 pb-24"
              role="list"
            >
              {state.dogs.map((dog) => (
                <DogCard
                  dog={dog}
                  isFavorite={isFavorite?.(dog.id) || false}
                  key={dog.id}
                  onToggleFavorite={() => toggleFavorite?.(dog)}
                />
              ))}
            </ul>
          </div>
        ) : state && !pending ? (
          <div className="flex flex-col items-center justify-center p-16">
            <IconDog className="text-gray-300 mb-4" size={48} />
            <Text size="lg">No dogs found matching your criteria.</Text>
            <Text className="mt-1" size="sm">
              Try selecting different breeds or clear your search.
            </Text>
          </div>
        ) : pending ? (
          <div className="flex flex-col items-center justify-center p-16">
            <Text size="lg">Searching for dogs...</Text>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-16">
            <IconDog className="text-gray-300 mb-4" size={48} />
            <Text size="lg">Select a breed to start searching</Text>
            <Text className="mt-1" size="sm">
              Use the search box above to find your perfect companion
            </Text>
          </div>
        )}
      </section>

      {state?.total && state?.total > state?.dogs?.length! && (
        <Pagination
          breeds={state.dogs?.map((dog) => dog.breed) || []}
          searchBreedsAction={searchBreedsAction}
          state={state}
        />
      )}

      <div className="md:hidden fixed bottom-24 right-4 z-30">
        <Button
          aria-label={`View ${favorites?.length || 0} favorite dogs`}
          className="rounded-full shadow-lg"
          color="red"
          disabled={!favorites?.length}
          onClick={() => setIsFavouritesOpened(true)}
          size="md"
          variant={favorites?.length ? "filled" : "light"}
        >
          <IconHeart size={18} />
          <span className="ml-1">{favorites?.length || 0}</span>
        </Button>
      </div>

      <FavouritesModal
        clearFavorites={() => clearFavorites()}
        closeModal={() => setIsFavouritesOpened(false)}
        favorites={favorites || []}
        isModalOpened={isFavouritesOpened}
        removeFavourite={(dog) => toggleFavorite?.(dog)}
      />
    </div>
  );
}
