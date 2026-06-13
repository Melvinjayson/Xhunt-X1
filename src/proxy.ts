import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Clerk removed — preview build, all routes open
export default function middleware(_req: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)",
    "/api/(.*)",
  ],
};
