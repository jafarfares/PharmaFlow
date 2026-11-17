"use client";

import FullPageLoader from "@/components/shared/Loading/FullPageLoader";
import StaffError from "@/app/[locale]/error";
import StaffEditForm from "@/features/staff/components/StaffEditForm";
import useStaffById from "@/features/staff/hooks/useStaffById";
import { useParams } from "next/navigation";
import Header from "@/app/[locale]/(team)/staff/[id]/edit/header"
export default function EditStaffPage() {
  const { id } = useParams<{ id: string }>();
  const staffId = Number(id);
  const isValidId = Number.isInteger(staffId) && staffId > 0;
  const staffQuery = useStaffById(isValidId ? staffId : 0);

  if (!isValidId) {
    return <StaffError message="The staff ID in this URL is invalid." />;
  }

  if (staffQuery.error) {
    return (
      <StaffError
        message={
          staffQuery.error instanceof Error
            ? staffQuery.error.message
            : "Failed to load this staff member."
        }
      />
    );
  }

  if (staffQuery.isPending || !staffQuery.data) return <FullPageLoader />;

  return (
    <main className="space-y-5 p-6">
      <Header/>
      <div className="w-full max-w-2xl">
        <StaffEditForm staff={staffQuery.data} />
      </div>
    </main>
  );
}
