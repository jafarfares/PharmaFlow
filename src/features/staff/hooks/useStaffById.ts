"use client";

import { useQuery } from "@tanstack/react-query";
import { getStaffById } from "@/features/staff/api/Get/url/getStaffById";

export default function useStaffById(id: number) {
  return useQuery({
    queryKey: ["staff", id],
    queryFn: () => getStaffById(id),
    enabled: Number.isInteger(id) && id > 0,
  });
}
