"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

import { breadcrumbConfig } from "@/layout/Navbar/components/breadcrumbs";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function BreadCrumb() {
  const pathname = usePathname();
  const t = useTranslations("Navbar");

  // Remove locale from pathname
  const segments = pathname.split("/").filter(Boolean).slice(1);

  const breadcrumbs = segments.map((segment, index) => ({
    key: segment,
    href: `/${segments.slice(0, index + 1).join("/")}`,
    label: breadcrumbConfig[
      segment as keyof typeof breadcrumbConfig
    ],
  }));

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <div key={item.href} className="contents">
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>
                    {item.label ? t(item.label) : item.key}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink render={<Link href={item.href} />}>
                    {item.label ? t(item.label) : item.key}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>

              {!isLast && <BreadcrumbSeparator />}
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
