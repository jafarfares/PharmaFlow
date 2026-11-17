import type { StaffUpdateType } from "@/features/staff/api/Update/types/staff.schema";
export interface UpdateStaffProps {
  id: number;
  data: StaffUpdateType;
}
