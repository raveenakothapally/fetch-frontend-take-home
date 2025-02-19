"use client";

import { logoutAction } from "@/actions/auth";
import { ActionIcon, Button, Tooltip } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import { useTransition } from "react";

interface LogoutButtonProps {
  className?: string;
  size?: string;
  variant?: "button" | "icon";
}

export default function LogoutButton({
  className = "",
  size = "sm",
  variant = "button",
}: LogoutButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(() => {
      logoutAction();
    });
  };

  if (variant === "icon") {
    return (
      <Tooltip label="Logout">
        <ActionIcon
          aria-label="Logout"
          className={className}
          color="gray"
          loading={isPending}
          onClick={handleLogout}
          size={size}
          variant="subtle"
        >
          <IconLogout size={18} stroke={1.5} />
        </ActionIcon>
      </Tooltip>
    );
  }

  return (
    <Button
      className={className}
      color="gray"
      leftSection={<IconLogout size={16} />}
      loading={isPending}
      onClick={handleLogout}
      size={size}
      variant="subtle"
    >
      Logout
    </Button>
  );
}
