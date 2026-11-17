import {
  rowSelectionFeature,
  type ColumnDef,
  type TableFeatures,
} from "@tanstack/react-table";
import type { Staff } from "@/features/staff/types/staff.type";
import { Badge } from "@/components/ui/badge";
import Action from "@/features/staff/components/Action";
import { Checkbox } from "@/components/ui/checkbox";

export type StaffTableFeatures = Pick<TableFeatures, "rowSelectionFeature"> & {
  rowSelectionFeature: typeof rowSelectionFeature;
};

export const columns: ColumnDef<StaffTableFeatures, Staff>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={
          table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()
        }
        onCheckedChange={(checked) => table.toggleAllPageRowsSelected(checked)}
        aria-label="Select all staff on this page"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(checked) => row.toggleSelected(checked)}
        aria-label={`Select ${row.original.name}`}
      />
    ),
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "is_active",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.original.is_active;
      return (
        <Badge variant={isActive ? "default" : "secondary"}>
          {isActive ? "Active" : "Inactive"}
        </Badge>
      );
    },
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <Action id={row.original.id} />,
  },
];
