import { useMutation } from "@tanstack/react-query";
import { Login } from "@/features/auth/login/api/login";
import { LoginRequest } from "@/features/auth/login/types/auth.types";
//import { notifyAccessTokenChanged } from "@/components/shared/auth/access-token";
import { toast } from "@/components/ui/toast";
import getLoginErrorMessage from "../utils/error/error";
export function useLogin() {
  return useMutation({
    mutationFn: (data: LoginRequest) => Login(data),
    onSuccess: () => {
      toast.add({
        type: "success",
        description: "Logged in successfully.",
        priority: "high",
      });
    },
     onError: (error) => {
      toast.add({
        type: "error",
        description:getLoginErrorMessage(error),
        priority: "high",
      });
    },
  });
}
