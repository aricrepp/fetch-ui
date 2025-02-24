import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

import { PROTECTED_ROUTES } from "./lib/routes";

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();

  const checkRoute = PROTECTED_ROUTES.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (checkRoute && !cookieStore.get("session")?.value) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"],
};
