"use client";

import { useEffect, useState, type FormEvent } from "react";
import axios from "axios";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Staff } from "@/features/staff/types/staff.type";
import {
  StaffUpdateSchema,
  type StaffUpdateType,
} from "@/features/staff/api/Update/types/staff.schema";
import useStaffUpdate from "@/features/staff/hooks/staffUpdate";

interface StaffEditFormProps {
  staff: Staff;
}

type StaffFormValues = Pick<Staff, "name" | "email" | "is_active"> & {
  phone: string;
};

export default function StaffEditForm({ staff }: StaffEditFormProps) {
  const router = useRouter();
  const updateStaff = useStaffUpdate();
  const [form, setForm] = useState<StaffFormValues>({
    name: staff.name,
    email: staff.email,
    phone: staff.phone ?? "",
    is_active: staff.is_active,
  });
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    setForm({
      name: staff.name,
      email: staff.email,
      phone: staff.phone ?? "",
      is_active: staff.is_active,
    });
    setValidationError("");
  }, [staff]);
  const updateErrorMessage = axios.isAxiosError<{ message?: string }>(
    updateStaff.error,
  )
    ? updateStaff.error.response?.data?.message ?? updateStaff.error.message
    : updateStaff.error instanceof Error
      ? updateStaff.error.message
      : "The update failed. Please try again.";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setValidationError("");

    const result = StaffUpdateSchema.safeParse(form);

    if (!result.success) {
      setValidationError(
        result.error.issues[0]?.message ?? "Please check the form fields.",
      );
      return;
    }

    const data: StaffUpdateType = result.data;

    updateStaff.mutate(
      { id: staff.id, data },
      {
        onSuccess: () => {
          router.replace("/staff");
        },
      },
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl border bg-card p-6 shadow-sm"
    >
      <div className="space-y-2">
        <Label htmlFor="staff-name">Staff name</Label>
        <Input
          id="staff-name"
          value={form.name}
          onChange={(event) =>
            setForm((current) => ({ ...current, name: event.target.value }))
          }
          aria-invalid={Boolean(validationError)}
          disabled={updateStaff.isPending}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="staff-email">Email address</Label>
        <Input
          id="staff-email"
          type="email"
          value={form.email}
          onChange={(event) =>
            setForm((current) => ({ ...current, email: event.target.value }))
          }
          disabled={updateStaff.isPending}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="staff-phone">Phone number</Label>
        <Input
          id="staff-phone"
          type="tel"
          value={form.phone}
          onChange={(event) =>
            setForm((current) => ({ ...current, phone: event.target.value }))
          }
          disabled={updateStaff.isPending}
        />
      </div>

      <div className="flex items-center gap-3">
        <Checkbox
          id="staff-active"
          checked={form.is_active}
          onCheckedChange={(checked) =>
            setForm((current) => ({ ...current, is_active: checked === true }))
          }
          disabled={updateStaff.isPending}
        />
        <Label htmlFor="staff-active">Active</Label>
      </div>

      {(validationError || updateStaff.isError) && (
        <p role="alert" className="text-sm text-destructive">
          {validationError || updateErrorMessage}
        </p>
      )}

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          disabled={updateStaff.isPending}
          onClick={() => router.push("/staff")}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={updateStaff.isPending}>
          {updateStaff.isPending ? "Saving…" : "Save changes"}
        </Button>
      </div>
    </form>
  );
}
