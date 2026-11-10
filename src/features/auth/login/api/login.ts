import api from "@/lib/axios/client";
import type {
  LoginRequest,
  LoginResponse,
} from "@/features/auth/login/types/auth.types";

export async function Login(
  data: LoginRequest
): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("/api/staff/auth/login", data);

  return response.data;
}