"use client";

import { logoutAction } from "@/actions/auth";
import { Avatar, Menu, UnstyledButton } from "@mantine/core";
import { IconChevronDown, IconLogout } from "@tabler/icons-react";
import { track } from "@vercel/analytics";
import { useState } from "react";
import { useTransition } from "react";

interface UserMenuProps {
  userEmail: string;
  userName: string;
}

export default function UserMenu({
  userEmail = "user@example.com",
  userName = "User",
}: UserMenuProps) {
  const [opened, setOpened] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    track("logout");
    startTransition(() => {
      logoutAction();
    });
  };

  return (
    <Menu
      offset={6}
      onChange={setOpened}
      opened={opened}
      position="bottom-end"
      shadow="md"
      width={220}
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton
          className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-100 transition-colors"
          data-testid="user-menu-button"
        >
          <Avatar color="blue" radius="xl" size="sm">
            U
          </Avatar>
          <div className="hidden md:block text-left mr-1">
            <p className="text-sm font-medium leading-none">{userName}</p>
            <p className="text-xs text-gray-500 mt-0.5">{userEmail}</p>
          </div>
          <IconChevronDown
            className={`transition-transform ${opened ? "rotate-180" : ""}`}
            size={14}
          />
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          color="red"
          data-testid="logout-button"
          disabled={isPending}
          leftSection={<IconLogout size={14} />}
          onClick={handleLogout}
        >
          {isPending ? "Logging out..." : "Logout"}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
