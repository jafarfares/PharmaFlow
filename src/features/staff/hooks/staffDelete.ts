"use client";

import { useMutation,useQueryClient  } from "@tanstack/react-query";
import { Delete } from "../api/Delete/url/delete";

export function useDeleteStaff() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn:(id:number)=>Delete(id),
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey: ["staff"],
            });
        },
    });
   
}
