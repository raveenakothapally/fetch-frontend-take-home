"use client";

import { Dog } from "@/lib/definitions";
import { ActionIcon, Badge, Button, Group, Text } from "@mantine/core";
import { IconConfetti, IconMapPin, IconPaw, IconX } from "@tabler/icons-react";
import { track } from "@vercel/analytics";
import Image from "next/image";

interface MatchedDogCardProps {
  dog: Dog;
  onClose: () => void;
}

export function MatchedDogCard({ dog, onClose }: MatchedDogCardProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full flex justify-end">
        <ActionIcon onClick={onClose} variant="subtle">
          <IconX size={18} />
        </ActionIcon>
      </div>

      <div className="w-full text-center mb-4">
        <div className="flex items-center justify-center gap-2 mb-3">
          <IconConfetti className="text-yellow-500" size={28} />
          <Text
            className="bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text"
            fw={700}
            size="xl"
          >
            It's a Match!
          </Text>
          <IconConfetti className="text-yellow-500" size={28} />
        </div>
        <Text size="sm">
          Based on your favorites, we found your perfect canine companion
        </Text>
      </div>

      <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl w-full max-w-md mx-auto">
        <div className="relative mb-4">
          <div className="w-full h-[240px] relative rounded-xl overflow-hidden shadow-md">
            <Image
              alt={`Photo of ${dog.name}, your matched dog`}
              fill
              priority
              src={dog.img}
              style={{ objectFit: "cover" }}
            />
          </div>
          <Badge
            className="absolute top-3 right-3 shadow-sm"
            gradient={{ from: "indigo", to: "cyan" }}
            radius="md"
            size="lg"
            variant="gradient"
          >
            Perfect Match!
          </Badge>
        </div>

        <div className="text-center mb-3">
          <Text fw={700} size="xl">
            Meet {dog.name}
          </Text>
          <Text size="sm">{dog.breed}</Text>
        </div>

        <Group className="justify-center mb-4" gap="md">
          <Badge leftSection={<IconPaw size={14} />} variant="light">
            {dog.age} years old
          </Badge>
          <Badge leftSection={<IconMapPin size={14} />} variant="light">
            {dog.zip_code}
          </Badge>
        </Group>

        <Text mb={5} size="sm" ta="center">
          {dog.name} is waiting for you! Contact the shelter to meet your new
          best friend.
        </Text>

        <Button
          className="w-full bg-gradient-to-r from-green-500 to-emerald-700"
          onClick={() => {
            track("contact-shelter", { dog: dog.id });
            // In a real app, this might open contact info or redirect
            alert("Calling shelter to meet your new best friend!");
          }}
          radius="md"
          size="md"
        >
          Contact Shelter
        </Button>
      </div>
    </div>
  );
}
