import api from "@/lib/axios/client";
import type { StaffResponse } from "@/features/staff/types/staff.type";

export async function getStaffList(): Promise<StaffResponse> {
  const response = await api.get<StaffResponse>("/api/staff/");
  return response.data;
}
