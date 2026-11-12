import api from "@/lib/axios/client";
import {LogoutResponse} from "@/features/auth/logout/types/logoutType"
export default async function Logout(): Promise<LogoutResponse>{
    const response=await api.post<LogoutResponse>("/api/staff/auth/logout");
    console.log(response.data);
    return response.data
}