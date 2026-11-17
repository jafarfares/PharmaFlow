import api from "@/lib/axios/client";
import type { Staff } from "@/features/staff/types/staff.type";

type StaffApiResponse = Staff | { data: Staff };

export async function getStaffById(id: number): Promise<Staff> {
  const response = await api.get<StaffApiResponse>(`/api/staff/${id}`);

  return "data" in response.data ? response.data.data : response.data;
}
