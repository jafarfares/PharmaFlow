"use client";
//icon
import { Trash2, Search as SearchIcon } from "lucide-react";
//shadcn ui
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
//types
import { SearchProps } from "@/features/staff/types/staff.type";
import { StatusFilter } from "@/features/staff/types/staff.type";
import router from "next/router";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { Plus } from "lucide-react";

export default function SearchData({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  setCurrentPage,
  selectedCount,
  deleteSelected,
}: SearchProps) {
  const router = useRouter();
  const locale = useLocale();

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full sm:max-w-sm">
        <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          placeholder="Search staff..."
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setCurrentPage(1);
          }}
          className="pl-9"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={() => router.push(`/${locale}/staff/create`)}>
          <Plus />
          Add Staff
        </Button>
        <select
          value={statusFilter}
          onChange={(event) => {
            setStatusFilter(event.target.value as StatusFilter);
            setCurrentPage(1);
          }}
          className="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        {selectedCount > 0 && (
          <Button variant="destructive" size="sm" onClick={deleteSelected}>
            <Trash2 className="mr-2 size-4" />
            Delete Selected ({selectedCount})
          </Button>
        )}
      </div>
    </div>
  );
}
