// import createMiddleware from "next-intl/middleware";
// import { NextResponse, type NextRequest } from "next/server";

// import { routing } from "@/i18n/routing";

// const handleI18nRouting = createMiddleware(routing);

// export default function proxy(request: NextRequest) {
//   const { pathname } = request.nextUrl;
//   const locale = routing.locales.find(
//     (candidate) =>
//       pathname === `/${candidate}` || pathname.startsWith(`/${candidate}/`)
//   );
//   const pathnameWithoutLocale = locale
//     ? pathname.slice(locale.length + 1) || "/"
//     : pathname;

//   if (
//     pathnameWithoutLocale !== "/login" &&
//     !request.cookies.has("access_token")
//   ) {
//     const loginUrl = new URL(`/${locale ?? routing.defaultLocale}/login`, request.url);
//     return NextResponse.redirect(loginUrl);
//   }

//   return handleI18nRouting(request);
// }

// export const config = {
//   matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
// };



import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";

import { routing } from "@/i18n/routing";

const handleI18nRouting = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  return handleI18nRouting(request);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};