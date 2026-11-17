"use client";

import { useEffect, useMemo, useState } from "react";
import type { Staff } from "@/features/staff/types/staff.type";
import {
  rowSelectionFeature,
  tableFeatures,
  useTable,
  type RowSelectionState,
} from "@tanstack/react-table";
import { columns } from "@/features/staff/table/columns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


import Pagination from "@/features/staff/components/Pagination";
import Header from "@/features/staff/components/header";
import SearchData from "@/features/staff/components/search";

interface StaffTableProps {
  staffData: Staff[];
}

type StatusFilter = "all" | "active" | "inactive";

const features = tableFeatures({ rowSelectionFeature });

export default function StaffTable({ staffData }: StaffTableProps) {
  const [rows, setRows] = useState<Staff[]>(staffData);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 5;

  useEffect(() => {
    setRows((currentRows) => {
      const refreshedById = new Map(
        staffData.map((staff) => [staff.id, staff] as const),
      );

      const refreshedInCurrentOrder = currentRows.flatMap((currentStaff) => {
        const refreshedStaff = refreshedById.get(currentStaff.id);
        if (!refreshedStaff) return [];

        refreshedById.delete(currentStaff.id);
        return [refreshedStaff];
      });

      return [...refreshedInCurrentOrder, ...refreshedById.values()];
    });
  }, [staffData]);

  // Search + Filter
  const filteredRows = useMemo(() => {
    return rows.filter((staff) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        staff.name.toLowerCase().includes(searchValue) ||
        staff.email.toLowerCase().includes(searchValue) ||
        (staff.phone ?? "").toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && staff.is_active) ||
        (statusFilter === "inactive" && !staff.is_active);

      return matchesSearch && matchesStatus;
    });
  }, [rows, search, statusFilter]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize));

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, totalPages));
  }, [totalPages]);

  const paginatedRows = filteredRows.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  // Delete selected rows
  const deleteSelected = () => {
    const selectedIds = new Set(table.getSelectedRowIds());
    const selectedOnFilteredRows = filteredRows.filter((staff) =>
      selectedIds.has(String(staff.id)),
    ).length;
    setRows((previous) =>
      previous.filter((staff) => !selectedIds.has(String(staff.id))),
    );
    setRowSelection({});
    setCurrentPage((page) =>
      Math.min(
        page,
        Math.max(1, Math.ceil((filteredRows.length - selectedOnFilteredRows) / pageSize)),
      ),
    );
  };

  const table = useTable({
    features,
    data: paginatedRows,
    columns,
    getRowId: (staff) => String(staff.id),
    state: { rowSelection },
    onRowSelectionChange: setRowSelection,
  });

  return (
    <div className="space-y-5 p-6">
      {/* Header */}
      <Header rows={rows} />

      {/* Toolbar */}
      <SearchData
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        setCurrentPage={setCurrentPage}
        selectedCount={table.getSelectedRowIds().length}
        deleteSelected={deleteSelected}
      />

      {/* Table */}
      <div className="overflow-hidden rounded-lg border bg-background">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                      <table.FlexRender header={header} />
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getAllCells().map((cell) => (
                    <TableCell key={cell.id}>
                      <table.FlexRender cell={cell} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-32 text-center"
                >
                  No staff members found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          pageSize={pageSize}
          totalItems={filteredRows.length}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}
