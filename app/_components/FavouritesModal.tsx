"use client";

import { match } from "@/actions/match";
import { Dog } from "@/lib/definitions";
import {
  ActionIcon,
  Badge,
  Button,
  Divider,
  Group,
  Image,
  Modal,
  ScrollArea,
  Text,
  Tooltip,
  TransitionProps,
} from "@mantine/core";
import { IconDog, IconHeart, IconHeartOff, IconX } from "@tabler/icons-react";
import { useActionState, useEffect, useState } from "react";

import { showMatchSuccess } from "./FavoriteToasts"; // Add this import
import { MatchedDogCard } from "./MatchedDogCard";

interface FavouritesProps {
  clearFavorites: () => void;
  closeModal: () => void;
  favorites: Dog[];
  isModalOpened: boolean;
  removeFavourite: (dog: Dog) => void;
}

export default function FavouritesModal({
  clearFavorites,
  closeModal,
  favorites,
  isModalOpened,
  removeFavourite,
}: FavouritesProps) {
  const [matchedDog, matchAction] = useActionState(match, {});
  const [isMatching, setIsMatching] = useState(false);
  const [matchSuccessful, setMatchSuccessful] = useState(false);

  // Handle matched dog result
  useEffect(() => {
    if (matchedDog.dog) {
      setMatchSuccessful(true);
      setIsMatching(false);
      showMatchSuccess(); // Add this line to show the toast notification
    }
  }, [matchedDog]);

  // Handle matching state
  const handleMatchSubmit = () => {
    setIsMatching(true);
    setTimeout(() => {
      (
        document.getElementById("match-form") as HTMLFormElement
      )?.requestSubmit();
    }, 100);
  };

  return (
    <Modal
      classNames={{
        body: "pt-4",
        header: "border-b pb-3",
        title: "font-bold text-xl",
      }}
      onClose={() => {
        closeModal();
        setMatchSuccessful(false);
      }}
      opened={isModalOpened}
      radius="md"
      size="lg"
      title={
        <Group>
          <IconHeart color="#6366f1" size={24} />
          <Text
            fw={700}
            gradient={{ deg: 90, from: "indigo", to: "blue" }}
            size="xl"
            variant="gradient"
          >
            Your Favorite Dogs
          </Text>
          <Badge color="blue" ml="auto" variant="light">
            {favorites.length} {favorites.length === 1 ? "dog" : "dogs"}{" "}
            selected
          </Badge>
        </Group>
      }
      transitionProps={
        {
          duration: 200,
          transition: "fade",
        } as TransitionProps
      }
      withCloseButton={!matchSuccessful}
    >
      {matchSuccessful && matchedDog.dog ? (
        <MatchedDogCard
          dog={matchedDog.dog}
          onClose={() => {
            closeModal();
            setMatchSuccessful(false);
          }}
        />
      ) : (
        <>
          {favorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-gray-500">
              <IconHeartOff size={40} stroke={1.5} />
              <Text mt={2} ta="center">
                You haven't added any dogs to your favorites yet.
              </Text>
              <Button
                leftSection={<IconDog size={16} />}
                mt={3}
                onClick={closeModal}
                radius="md"
                size="sm"
                variant="light"
              >
                Browse Dogs
              </Button>
            </div>
          ) : (
            <>
              <ScrollArea
                h={favorites.length > 3 ? 320 : "auto"}
                offsetScrollbars
              >
                <ul className="space-y-3 p-1">
                  {favorites.map((dog) => (
                    <li
                      className="flex items-center justify-between bg-gray-50 rounded-md p-3 hover:bg-gray-100 transition-colors"
                      key={dog.id}
                    >
                      <div className="flex items-center space-x-3">
                        <Image
                          alt={dog.name}
                          className="rounded-full object-cover max-h-[60px] max-w-[60px] min-h-[60px] min-w-[60px]"
                          height={60}
                          radius="xl"
                          src={dog.img}
                          width={60}
                        />
                        <div className="flex flex-col">
                          <Text fw={600} size="md">
                            {dog.name}
                          </Text>
                          <Group gap="xs">
                            <Text size="sm">{dog.breed}</Text>
                            <Badge color="yellow" size="xs" variant="outline">
                              {dog.age} years
                            </Badge>
                          </Group>
                        </div>
                      </div>
                      <Tooltip label="Remove from favorites">
                        <ActionIcon
                          aria-label={`Remove ${dog.name} from favorites`}
                          color="red"
                          onClick={() => removeFavourite(dog)}
                          radius="xl"
                          variant="light"
                        >
                          <IconX size={18} />
                        </ActionIcon>
                      </Tooltip>
                    </li>
                  ))}
                </ul>
              </ScrollArea>

              <Divider my="md" />

              <form action={matchAction} id="match-form">
                <input
                  name="dogs"
                  type="hidden"
                  value={JSON.stringify(favorites)}
                />
                <Group justify="space-between" mt="md">
                  <Group>
                    <Button
                      color="gray"
                      onClick={closeModal}
                      radius="md"
                      variant="subtle"
                    >
                      Cancel
                    </Button>
                    <Button
                      color="pink"
                      onClick={clearFavorites}
                      radius="md"
                      variant="subtle"
                    >
                      Clear all favourites
                    </Button>
                  </Group>
                  <Button
                    className="flex-1 md:flex-none bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
                    disabled={favorites.length === 0 || isMatching}
                    loading={isMatching}
                    onClick={handleMatchSubmit}
                    radius="md"
                  >
                    Find Your Perfect Match
                  </Button>
                </Group>
              </form>
            </>
          )}
        </>
      )}
    </Modal>
  );
}
