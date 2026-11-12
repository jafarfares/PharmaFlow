"use client";

import { useQuery } from "@tanstack/react-query";
import Profile from "@/features/auth/profile/api/porofile";

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: Profile,
  });
}