"use client";

import { Dog } from "@/lib/definitions";
import { useEffect, useState } from "react";

export function useFavorites() {
  const [favorites, setFavorites] = useState<Dog[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem("dogFavorites");
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error("Failed to load favorites:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("dogFavorites", JSON.stringify(favorites));
    }
  }, [favorites, isLoaded]);

  const toggleFavorite = (dog: Dog) => {
    setFavorites((prev) => {
      if (prev.some((d) => d.id === dog.id)) {
        return prev.filter((d) => d.id !== dog.id);
      }
      return [...prev, dog];
    });
  };

  const isFavorite = (dogId: string) => {
    return favorites.some((dog) => dog.id === dogId);
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  return {
    clearFavorites,
    favorites,
    isFavorite,
    toggleFavorite,
  };
}
