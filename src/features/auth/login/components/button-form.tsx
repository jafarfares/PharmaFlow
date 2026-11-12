"use client";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { useTranslations } from "next-intl";
type ButtonFormProps = {
  isPending: boolean;
};

export default function ButtonForm({ isPending }: ButtonFormProps) {
  const t = useTranslations("Login")
  return (
    <Button
      type="submit"
      disabled={isPending}
      className="h-10 pl-8 w-full bg-blue-600 text-base hover:bg-blue-700 dark:text-white"
    >
      <LogIn size={20} />
      {isPending ? t("Logging in") : t("Login")}
    </Button>
  );
}
