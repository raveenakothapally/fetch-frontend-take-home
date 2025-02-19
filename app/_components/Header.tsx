"use client";

import { Text } from "@mantine/core";
import { IconDog } from "@tabler/icons-react";
import Link from "next/link";

import UserMenu from "@/_components/UserMenu";

interface HeaderProps {
  isAuthenticated?: boolean;
  userEmail: string;
  userName: string;
}

export default function Header({
  isAuthenticated = false,
  userEmail,
  userName,
}: HeaderProps) {
  return (
    <header className="shadow-md flex items-center justify-between p-4 bg-white">
      <div className="flex items-center gap-2">
        <IconDog className="text-blue-600" size={28} />
        <Link href="/">
          <Text fw={700} size="xl">
            Dog Finder
          </Text>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <UserMenu userEmail={userEmail} userName={userName} />
        ) : null}
      </div>
    </header>
  );
}
