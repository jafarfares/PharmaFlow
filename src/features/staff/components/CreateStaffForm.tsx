
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { z } from "zod";
import axios from "axios";

import {
  StaffCreateSchema,
  type StaffCreateType,
} from "@/features/staff/api/Create/types/StaffCreateSchema";

import { useCreateStaff } from "@/features/staff/hooks/useCreateStaff";

export default function CreateStaffForm() {
  const router = useRouter();
  const locale = useLocale();

  const createStaff = useCreateStaff();
  const createErrorMessage = getCreateErrorMessage(createStaff.error);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<
    z.input<typeof StaffCreateSchema>,
    unknown,
    StaffCreateType
  >({
    resolver: zodResolver(StaffCreateSchema),

    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      is_active: false,
    },
  });

  async function onSubmit(data: StaffCreateType) {
    try {
      await createStaff.mutateAsync(data);

      router.replace(`/${locale}/staff`);
    } catch {
      // Mutation stores the error in createStaff.error
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name</label>
        <input {...register("name")} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <label>Email</label>
        <input type="email" {...register("email")} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <label>Password</label>
        <input type="password" {...register("password")} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <div>
        <label>Phone</label>
        <input type="tel" {...register("phone")} />
        {errors.phone && <p>{errors.phone.message}</p>}
      </div>

      <div>
        <label>
          <input type="checkbox" {...register("is_active")} />
          Active
        </label>
      </div>

      {createStaff.isError && (
        <p role="alert">{createErrorMessage}</p>
      )}

      <button type="submit" disabled={createStaff.isPending}>
        {createStaff.isPending ? "Creating..." : "Create Staff"}
      </button>

      <button
        type="button"
        onClick={() => router.back()}
        disabled={createStaff.isPending}
      >
        Cancel
      </button>
    </form>
  );
}

function getCreateErrorMessage(error: unknown): string {
  if (!axios.isAxiosError(error)) {
    return error instanceof Error ? error.message : "Failed to create staff.";
  }

  const data: unknown = error.response?.data;
  if (typeof data === "string") return data;

  if (data && typeof data === "object") {
    const body = data as {
      message?: unknown;
      detail?: unknown;
      errors?: Record<string, unknown>;
    };
    const detail = body.detail ?? body.message;
    if (typeof detail === "string") return detail;
    if (Array.isArray(detail)) {
      const messages = detail
        .map((item) => {
          if (typeof item === "string") return item;
          if (item && typeof item === "object" && "msg" in item) {
            return String(item.msg);
          }
          return "";
        })
        .filter(Boolean);
      if (messages.length) return messages.join("; ");
    }
    if (body.errors) {
      const messages = Object.entries(body.errors)
        .flatMap(([field, value]) =>
          (Array.isArray(value) ? value : [value]).map(
            (message) => `${field}: ${String(message)}`,
          ),
        );
      if (messages.length) return messages.join("; ");
    }
  }

  return error.message || "Failed to create staff.";
}
