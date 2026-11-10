"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "@/i18n/navigation";
import { getAccessToken } from "@/lib/axios/token";

export default function AuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const isLoginPage = pathname === "/login";

  useEffect(() => {
    if (isLoginPage) return;

    const token = getAccessToken();

    if (!token) {
      router.replace("/login");
      return;
    }

    const timer = window.setTimeout(() => {
      setIsAuthenticated(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [isLoginPage, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return <p>Checking authentication...</p>;
  }

  return <>{children}</>;
}
