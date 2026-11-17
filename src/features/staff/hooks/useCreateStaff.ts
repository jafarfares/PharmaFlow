
"use client";

import { useMutation } from "@tanstack/react-query";
import CreateStaff from "@/features/staff/api/Create/url/createStaff";

export function useCreateStaff() {
  return useMutation({
    mutationFn: CreateStaff,
  });
}
