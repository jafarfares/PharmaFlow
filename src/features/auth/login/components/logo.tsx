import { Plane } from "lucide-react";
import { useTranslations } from "next-intl";
export default function Logo() {
  const t = useTranslations("Login");
  return (
    <>
      <div className="mb-3 flex items-center justify-center gap-1">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white">
          <Plane size={35} />
        </div>
      </div>

      {/* Heading */}
      <div className="mb-10 text-center">
        <p className="mt-3 text-slate-600 dark:text-white">
          {t("Sign in to your account to continue")}
        </p>
      </div>
    </>
  );
}
