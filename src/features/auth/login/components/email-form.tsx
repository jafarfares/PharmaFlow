"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
type EmailFormProps = {
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

export default function EmailForm({
  value,
  onChange,
  error,
}: EmailFormProps) {


  const t = useTranslations("Login");
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <div className="space-y-2">
      <Label htmlFor="email" className="text-slate-700 dark:text-white">
        {t("Email")}
      </Label>

      <div className="relative">
        <Mail
           className={`absolute top-1/2 -translate-y-1/2 text-slate-500 ${isRTL ? "left-4" : "right-4"}`}
          size={20}
        />

        <Input
          id="email"
          type="email"
          autoComplete="email"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t("Enter your email")}
          className="h-10 pl-8 text-base text-slate-900 dark:text-white"
          aria-invalid={Boolean(error)}
        />
      </div>
      {error && <p className="text-sm text-red-600">{t(error)}</p>}
    </div>
  );
}
