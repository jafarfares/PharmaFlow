import { z } from "zod";

export const StaffCreateSchema = z.object({
  name: z.string().trim().min(2, "Name must contain at least 2 characters"),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.preprocess(
    (value) =>
      typeof value === "string" && value.trim() === "" ? null : value,
    z.string().trim().nullable(),
  ),
  is_active: z.boolean(),
});
export type StaffCreateType = z.infer<typeof StaffCreateSchema>;
