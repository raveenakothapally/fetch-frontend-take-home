"use client";

import { Button, Tooltip } from "@mantine/core";
import { IconSortAscending, IconSortDescending } from "@tabler/icons-react";
import { track } from "@vercel/analytics";

interface SortToggleProps {
  direction: "asc" | "desc";
  disabled?: boolean;
  onChange: (direction: "asc" | "desc") => void;
}

export function SortToggle({
  direction,
  disabled = false,
  onChange,
}: SortToggleProps) {
  const toggleDirection = () => {
    track("sort_toggle", { direction: direction === "asc" ? "desc" : "asc" });
    onChange(direction === "asc" ? "desc" : "asc");
  };

  return (
    <Tooltip
      label={`Sort by breeds ${
        direction === "asc" ? "ascending" : "descending"
      }`}
      position="bottom"
    >
      <Button
        aria-label={`Sort breeds ${
          direction === "asc" ? "ascending" : "descending"
        }`}
        color="gray"
        disabled={disabled}
        leftSection={
          direction === "asc" ? (
            <IconSortAscending size={16} />
          ) : (
            <IconSortDescending size={16} />
          )
        }
        onClick={toggleDirection}
        size="sm"
        variant="subtle"
      >
        {direction === "asc" ? "A to Z" : "Z to A"}
      </Button>
    </Tooltip>
  );
}
