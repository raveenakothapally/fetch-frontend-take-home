"use client";

import { ActionIcon, Group, Text, Tooltip } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useEffect, useState } from "react";

interface PageInfo {
  currentPage: number;
  totalPages: number;
}

interface PaginationProps {
  breeds: string[];
  searchBreedsAction: (payload: FormData) => void;
  state: PaginationState;
}

interface PaginationState {
  next?: string | null | undefined;
  prev?: string | null | undefined;
  sortDirection?: "asc" | "desc";
  total?: number;
}

const ITEMS_PER_PAGE = parseInt(process.env.DOG_SEARCH_SIZE || "25", 10);

// Extract the button component to avoid repetition
interface PaginationButtonProps {
  action: (formData: FormData) => void;
  breeds: string[];
  direction: "next" | "prev";
  disabled: boolean;
  icon: React.ReactNode;
  label: string;
  nextValue: string;
  onNavigate: () => void;
  pageRequest: number;
  prevValue: string;
  sortDirection?: "asc" | "desc";
}

export function Pagination({
  breeds,
  searchBreedsAction,
  state,
}: PaginationProps) {
  const calculatePageInfo = (
    next: string | null | undefined,
    prev: string | null | undefined,
    total: number
  ): PageInfo => {
    const totalPages = Math.ceil(total / ITEMS_PER_PAGE) || 1;

    // When on the first page, prev is null
    if (!prev) {
      return {
        currentPage: 1,
        totalPages,
      };
    }

    // When on the last page, next is null
    if (!next) {
      return {
        currentPage: totalPages,
        totalPages,
      };
    }

    // For middle pages, extract the page number from the next URL
    const nextPage = next ? parseInt(next.match(/from=(\d+)/)![1], 10) : -1;

    return {
      currentPage: nextPage / ITEMS_PER_PAGE,
      totalPages,
    };
  };

  const [pageInfo, setPageInfo] = useState<PageInfo>(() =>
    calculatePageInfo(state.next, state.prev, state.total!)
  );

  // Update local state when the server state changes
  useEffect(() => {
    setPageInfo(calculatePageInfo(state.next, state.prev, state.total!));
  }, [state.total, state.prev, state.next]);

  const hasNextPage = !!state.next;
  const hasPrevPage = !!state.prev;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm py-3 px-4 border-t shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-30">
      <div className="max-w-4xl mx-auto flex flex-col-reverse sm:flex-row items-center justify-between">
        <div
          aria-live="polite"
          className="text-sm text-gray-600 mt-2 sm:mt-0 flex items-center"
        >
          <Text fw={500}>
            Page <span className="text-blue-600">{pageInfo.currentPage}</span>{" "}
            of <span className="text-blue-600">{pageInfo.totalPages}</span>
          </Text>
          <Text className="ml-2" size="xs">
            ({state.total} dogs total)
          </Text>
        </div>

        <div className="flex items-center justify-center">
          <Group>
            <PaginationButton
              action={searchBreedsAction}
              breeds={breeds}
              direction="prev"
              disabled={!hasPrevPage}
              icon={<IconChevronLeft aria-hidden="true" size={18} />}
              label="Previous page"
              nextValue=""
              onNavigate={() =>
                setPageInfo((prev) => ({
                  ...prev,
                  currentPage: Math.max(1, prev.currentPage - 1),
                }))
              }
              pageRequest={Math.max(1, pageInfo.currentPage - 1)}
              prevValue={state.prev || ""}
              sortDirection={state.sortDirection}
            />

            <PaginationButton
              action={searchBreedsAction}
              breeds={breeds}
              direction="next"
              disabled={!hasNextPage}
              icon={<IconChevronRight aria-hidden="true" size={18} />}
              label="Next page"
              nextValue={state.next || ""}
              onNavigate={() =>
                setPageInfo((prev) => ({
                  ...prev,
                  currentPage: Math.min(prev.totalPages, prev.currentPage + 1),
                }))
              }
              pageRequest={Math.min(
                pageInfo.totalPages,
                pageInfo.currentPage + 1
              )}
              prevValue=""
              sortDirection={state.sortDirection}
            />
          </Group>
        </div>
      </div>
    </div>
  );
}

function PaginationButton({
  action,
  breeds,
  disabled,
  icon,
  label,
  nextValue,
  onNavigate,
  pageRequest,
  prevValue,
  sortDirection = "asc",
}: PaginationButtonProps) {
  return (
    <form action={action}>
      <input name="breeds" type="hidden" value={breeds} />
      <input name="prev" type="hidden" value={prevValue} />
      <input name="next" type="hidden" value={nextValue} />
      <input name="pageRequest" type="hidden" value={pageRequest} />
      <input name="sortDirection" type="hidden" value={sortDirection} />

      <Tooltip label={label}>
        <div>
          <ActionIcon
            aria-label={label}
            className="transition-all"
            color="blue"
            disabled={disabled}
            onClick={onNavigate}
            radius="xl"
            size="lg"
            type="submit"
            variant="light"
          >
            {icon}
          </ActionIcon>
        </div>
      </Tooltip>
    </form>
  );
}
