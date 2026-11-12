import api from "@/lib/axios/client";
import {ProfileType} from "@/features/auth/profile/types/profileType"
export default async function Profile():Promise<ProfileType>{
    const response=await api.post<ProfileType>("/api/staff/auth/me");
    return response.data
}