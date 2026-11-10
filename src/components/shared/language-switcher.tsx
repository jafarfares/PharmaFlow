"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

 
  function changeLanguage(nextLocale: "ar" | "en") {
    if (locale !== nextLocale) {
      router.replace(pathname, { locale: nextLocale });
    }
  }

  return (
    <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Language
            </p>

            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={locale === "ar" ? "default" : "outline"}
                onClick={() => changeLanguage("ar")}
              >
                العربية
              </Button>

              <Button
                variant={locale === "en" ? "default" : "outline"}
                onClick={() => changeLanguage("en")}
              >
                English
              </Button>
            </div>
          </div>
  );
}