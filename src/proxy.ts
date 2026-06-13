import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/home(.*)",
  "/explore(.*)",
  "/missions(.*)",
  "/messages(.*)",
  "/profile(.*)",
  "/workspace(.*)",
  "/mission-control(.*)",
  "/agent-foundry(.*)",
  "/economy(.*)",
  "/developers(.*)",
  "/get-started(.*)",
]);

const isOnboardingRoute = createRouteMatcher(["/get-started(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (!isProtectedRoute(req)) {
    return NextResponse.next();
  }

  const session = await auth();

  if (!session.userId) {
    return session.redirectToSignIn({ returnBackUrl: req.url });
  }

  const publicMetadata = session.sessionClaims?.publicMetadata as
    | { onboarding_complete?: boolean; default_surface?: string }
    | undefined;

  if (publicMetadata?.onboarding_complete === false && !isOnboardingRoute(req)) {
    const url = new URL("/get-started", req.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)",
    "/api/(.*)",
  ],
};
