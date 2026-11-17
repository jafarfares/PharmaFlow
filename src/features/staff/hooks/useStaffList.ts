"use client";

import { useQuery } from "@tanstack/react-query";
import { getStaffList } from "@/features/staff/api/Get/url/getStaffList";

export default function useStaffList() {
  return useQuery({
    queryKey: ["staff"],
    queryFn: getStaffList,
  });
}
