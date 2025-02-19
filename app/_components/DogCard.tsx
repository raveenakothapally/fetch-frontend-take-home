"use client";

import { Dog } from "@/lib/definitions";
import { Badge, Paper, Text, Tooltip } from "@mantine/core";
import { IconHeart, IconMapPin, IconPaw } from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";

interface DogCardProps {
  dog: Dog;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function DogCard({
  dog,
  isFavorite,
  onToggleFavorite,
}: DogCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  /*
   * Determine the dog's size based on its age
   */
  const getDogSize = (age: number) => {
    if (age < 2) return "Puppy";
    if (age < 5) return "Young";
    if (age < 10) return "Adult";
    return "Senior";
  };

  const dogSize = getDogSize(dog.age);

  return (
    <li className="transition-all duration-300">
      <Paper
        className={`w-[250px] h-[380px] transition-all duration-300 ${
          isHovered ? "transform scale-[1.03]" : ""
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        p="md"
        radius="md"
        shadow={isHovered ? "md" : "sm"}
        withBorder
      >
        <div className="relative">
          <button
            aria-label={`${
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }: ${dog.name}, ${dog.breed}, ${dog.age} years old`}
            className="absolute top-2 right-2 z-10 bg-white/80 rounded-full p-1.5 shadow-sm transition-transform hover:scale-110"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite();
            }}
          >
            <IconHeart
              aria-hidden="true"
              className="transition-all"
              color={isFavorite ? "red" : "gray"}
              fill={isFavorite ? "red" : "transparent"}
              size={22}
            />
          </button>

          <div className="rounded-lg overflow-hidden mb-3 shadow-inner">
            <Image
              alt={`Photo of ${dog.name}, a ${dog.breed} dog`}
              className="w-full h-[180px] object-cover transition-all duration-500 hover:scale-110"
              height={180}
              loading="lazy"
              src={dog.img}
              width={220}
            />
          </div>
        </div>

        <div className="flex flex-col space-y-2 mt-1">
          <div className="flex justify-between items-center">
            <Text fw={700} lineClamp={1} size="lg" title={dog.name}>
              {dog.name}
            </Text>
            <Tooltip label={`${dog.age} years old`}>
              <Badge color="yellow" variant="light">
                {dogSize}
              </Badge>
            </Tooltip>
          </div>

          <Text lineClamp={1} size="sm" title={dog.breed}>
            {dog.breed}
          </Text>

          <div className="flex justify-between pt-2 mt-auto">
            <div
              aria-label={`${dog.age} years old`}
              className="flex items-center space-x-1"
            >
              <IconPaw aria-hidden="true" size={16} />
              <Text fw={500} size="sm">
                {dog.age} yr
              </Text>
            </div>

            <div
              aria-label={`Zip code ${dog.zip_code}`}
              className="flex items-center space-x-1"
            >
              <IconMapPin aria-hidden="true" size={16} />
              <Text fw={500} size="sm">
                {dog.zip_code}
              </Text>
            </div>
          </div>

          <button
            aria-label={`${isFavorite ? "Remove" : "Add"} ${dog.name} ${
              isFavorite ? "from" : "to"
            } favorites`}
            className="w-full mt-3 py-2 px-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md transition-colors text-sm font-medium"
            onClick={onToggleFavorite}
          >
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </button>
        </div>
      </Paper>
    </li>
  );
}
