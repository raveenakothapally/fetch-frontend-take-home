"use client";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";

const theme = createTheme({
  primaryColor: "blue",
});

export function Providers({ children }: { children: React.ReactNode }) {
  // Handle hydration issues with notifications
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <MantineProvider defaultColorScheme="light" theme={theme}>
      {mounted && <Notifications position="top-right" zIndex={2000} />}
      {children}
    </MantineProvider>
  );
}
