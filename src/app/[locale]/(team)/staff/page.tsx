"use client";

import FullPageLoader from "@/components/shared/Loading/FullPageLoader";
import StaffError from "@/app/[locale]/error";
import StaffTable from "@/features/staff/staff";
import useStaffList from "@/features/staff/hooks/useStaffList";

export default function StaffPage() {
  const { data, error, isPending } = useStaffList();

  if (error) {
    return (
      <StaffError
        message={error instanceof Error ? error.message : "Failed to load staff."}
      />
    );
  }

  if (isPending || !data) return <FullPageLoader />;

  return <StaffTable staffData={data.data} />;
}
