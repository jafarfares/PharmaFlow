import type { HeaderProps } from "@/features/staff/types/staff.type"

export default function Header({ rows }: HeaderProps) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Staff
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage your staff members.
        </p>
      </div>

      <div className="text-sm text-muted-foreground">
        {rows.length} staff members
      </div>
    </div>
  );
}