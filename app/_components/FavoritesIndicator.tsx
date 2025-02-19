"use client";

import { Dog } from "@/lib/definitions";
import { Button, Indicator } from "@mantine/core";
import { IconHeart } from "@tabler/icons-react";

interface FavoritesIndicatorProps {
  favorites: Dog[];
  onClick: () => void;
}

export function FavoritesIndicator({
  favorites,
  onClick,
}: FavoritesIndicatorProps) {
  const count = (
    <span className="text-white font-bold">{favorites.length}</span>
  );

  return (
    <Indicator
      color="red"
      disabled={favorites.length === 0}
      label={count}
      offset={8}
      position="top-end"
      size={24}
    >
      <Button
        aria-label={`View ${count} favorite dogs`}
        className="rounded-full shadow-md"
        gradient={{ deg: 90, from: "red", to: "pink" }}
        leftSection={<IconHeart size={16} />}
        onClick={onClick}
        variant="gradient"
      >
        {favorites.length === 1 ? "Favorite" : "Favorites"}
      </Button>
    </Indicator>
  );
}
