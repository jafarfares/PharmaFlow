import { useMutation } from "@tanstack/react-query";
import Logout from "@/features/auth/logout/api/logout";
import { useRouter } from "@/i18n/navigation";
import { toast } from "@/components/ui/toast";
import { removeAccessToken } from "@/lib/axios/token";

export function useLogout() {
  const router = useRouter();

  return useMutation({
    mutationFn: Logout,

    onSuccess: () => {
      removeAccessToken();
      toast.add({
        type: "success",
        description: "You have been logged out on this device.",
        priority: "high",
      });
      router.replace("/login");
    },

    onError: () => {
      toast.add({
        type: "error",
        description: "Logout failed",
        priority: "high",
      });
    },
  });
}
