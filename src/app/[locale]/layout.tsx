import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toast";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { Suspense } from "react";
import {
  getMessages,
  setRequestLocale,
} from "next-intl/server";

import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
//import { AuthGuard } from "@/components/shared/auth/access-token";
import AuthGuard from "@/components/shared/auth/access-token"
export const metadata: Metadata = {
  title: "My Application",
  description: "My Dashboard Application",
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({
    locale,
  }));
}

export default async function LocaleLayout({
  children,
  params,
}: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  const direction = locale === "ar" ? "rtl" : "ltr";

  return (
    <NextIntlClientProvider messages={messages}>
      <div
        lang={locale}
        dir={direction}
        className="min-h-screen"
      >
        <Toaster><AuthGuard>{children}</AuthGuard></Toaster>
        
      </div>
    </NextIntlClientProvider>
  );
}
