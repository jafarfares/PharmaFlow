"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@/i18n/navigation";

import { Login } from "@/features/auth/login/api/login";
import type { LoginRequest } from "@/features/auth/login/types/auth.types";

import { saveAccessToken } from "@/lib/axios/token";
import { toast } from "@/components/ui/toast";

import getLoginErrorMessage from "../utils/error/error";

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: LoginRequest) => Login(data),

    onSuccess: (data) => {
      saveAccessToken(data.access_token);

      toast.add({
        type: "success",
        description: "Logged in successfully.",
        priority: "high",
      });

      router.replace("/staff");
    },

    onError: (error) => {
      toast.add({
        type: "error",
        description: getLoginErrorMessage(error),
        priority: "high",
      });
    },
  });
}