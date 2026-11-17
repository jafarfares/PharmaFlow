import api from "@/lib/axios/client";
export async function Delete(id:number) {
    const response = await api.delete(`/api/staff/${id}`);
    return response.data
}