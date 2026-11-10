"use client";

import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { useState } from "react";
import { useLocale } from "next-intl";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
type PasswordFormProps = {
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

export default function PasswordForm({
  value,
  onChange,
  error,
}: PasswordFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const t =useTranslations("Login")
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <div className="space-y-2">
      <Label htmlFor="password" className="text-slate-700 dark:text-white">
        {t("Password")}
      </Label>

      <div className="relative">
  <LockKeyhole
    className="absolute start-4 top-1/2 -translate-y-1/2 text-slate-500"
    size={20}
  />

  <Input
    id="password"
    type={showPassword ? "text" : "password"}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={t("Enter your password")}
    autoComplete="current-password"
    className="h-10 ps-11 pe-12 text-base text-slate-900"
    aria-invalid={Boolean(error)}
  />

  <button
    type="button"
    onClick={() => setShowPassword((prev) => !prev)}
    className="absolute end-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-900 dark:text-white dark:hover:text-slate-300"
    aria-label={showPassword ? "Hide password" : "Show password"}
  >
    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
  </button>
</div>

      {error && <p className="text-sm text-red-600">{t(error)}</p>}
    </div>
  );
}