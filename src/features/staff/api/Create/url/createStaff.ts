
import api from "@/lib/axios/client";

import type {
  StaffCreateType,
} from "@/features/staff/api/Create/types/StaffCreateSchema";

export default async function CreateStaff(data: StaffCreateType) {
  const response = await api.post("/api/staff/", data);

  return response.data;
}
