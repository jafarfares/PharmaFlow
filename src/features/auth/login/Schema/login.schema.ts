import { z } from "zod";

export const LoginSchema = z.strictObject({
  email: z.email("البريد الإلكتروني غير صحيح"),
  password: z.string().min(1, "كلمة المرور مطلوبة"),
});

export type LoginFormValues = z.infer<typeof LoginSchema>;