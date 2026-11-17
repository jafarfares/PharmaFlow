"use client";
import type { UpdateStaffProps } from "@/features/staff/api/Update/types/update-staff-type";
import UpdateStaff from "@/features/staff/api/Update/url/updateStaff";
import type { Staff, StaffResponse } from "@/features/staff/types/staff.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export default function useStaffUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: UpdateStaffProps) => UpdateStaff(params),
    onSuccess: async (_response, { id, data }) => {
      const updatedFields = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        is_active: data.is_active,
      };

      queryClient.setQueryData<StaffResponse>(["staff"], (previous) =>
        previous
          ? {
              ...previous,
              data: previous.data.map((staff) =>
                staff.id === id ? { ...staff, ...updatedFields } : staff,
              ),
            }
          : previous,
      );

      queryClient.setQueryData<Staff>(["staff", id], (previous) =>
        previous ? { ...previous, ...updatedFields } : previous,
      );

      await queryClient.invalidateQueries({
        queryKey: ["staff"],
        exact: true,
      });
    },
  });
}
