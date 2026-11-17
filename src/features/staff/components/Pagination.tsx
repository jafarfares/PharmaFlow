"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PaginationProps } from "@/features/staff/types/staff.type"

export default function Pagination({
  currentPage,
  pageSize,
  totalItems,
  totalPages,
  setCurrentPage,
}: PaginationProps) {
  const startItem =
    totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;

  const endItem = Math.min(
    currentPage * pageSize,
    totalItems
  );

  return (
    <div className="flex items-center justify-between border-t px-4 py-3">
      <p className="text-sm text-muted-foreground">
        {totalItems === 0
          ? "No results"
          : `Showing ${startItem}–${endItem} of ${totalItems}`}
      </p>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          disabled={currentPage <= 1}
          onClick={() =>
            setCurrentPage((page) => Math.max(1, page - 1))
          }
          aria-label="Previous page"
        >
          <ChevronLeft className="size-4" />
        </Button>

        <span className="text-sm tabular-nums">
          {currentPage} / {totalPages}
        </span>

        <Button
          variant="outline"
          size="icon"
          disabled={currentPage >= totalPages || totalPages === 0}
          onClick={() =>
            setCurrentPage((page) => Math.min(totalPages, page + 1))
          }
          aria-label="Next page"
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
