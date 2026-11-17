import api from "@/lib/axios/client";
import type { StaffUpdateType } from "@/features/staff/api/Update/types/staff.schema";
type UpdateStaffParams = {
  id: number;
  data: StaffUpdateType;
};

export default async function UpdateStaff({
  id,
  data,
}: UpdateStaffParams) {
  const response = await api.patch(`/api/staff/${id}`, data);
  return response.data;
}
