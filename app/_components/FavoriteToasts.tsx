"use client";

import type { NotificationData } from "@mantine/notifications";

import { notifications } from "@mantine/notifications";
import { IconCheck, IconHeartFilled, IconHeartOff } from "@tabler/icons-react";

interface NotificationDataWithId extends NotificationData {
  id: string;
}

const showNotification = (config: NotificationDataWithId) => {
  notifications.hide(config.id);

  // Timeout to ensure DOM is ready
  setTimeout(() => {
    notifications.show({
      ...config,
      style: { boxShadow: "0 2px 10px rgba(0,0,0,0.2)" },
      withBorder: true,
      withCloseButton: true,
    });
  }, 10);
};

export const showAddedToFavorites = (dogName: string) => {
  showNotification({
    autoClose: 3000,
    color: "green",
    icon: <IconHeartFilled size={16} />,
    id: `favorite-${dogName}`,
    message: `${dogName} has been added to your favorites`,
    title: "Added to Favorites",
  });
};

export const showRemovedFromFavorites = (dogName: string) => {
  showNotification({
    autoClose: 3000,
    color: "gray",
    icon: <IconHeartOff size={16} />,
    id: `unfavorite-${dogName}`,
    message: `${dogName} has been removed from your favorites`,
    title: "Removed from Favorites",
  });
};

export const showMatchSuccess = () => {
  showNotification({
    autoClose: 5000,
    color: "blue",
    icon: <IconCheck size={16} />,
    id: "match-success",
    message: "We've found your ideal canine companion!",
    title: "Perfect Match Found!",
  });
};
