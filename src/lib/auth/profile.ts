import { auth } from "@clerk/nextjs/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Role } from "@/lib/supabase/types";

export interface AuthenticatedProfile {
  id: string;
  clerk_user_id: string;
  tenant_id: string | null;
  role: Role;
  display_name: string | null;
  avatar_url: string | null;
  onboarding_complete: boolean;
  default_surface: "home" | "workspace" | "admin";
}

export async function getClerkUserId() {
  const { userId } = await auth();
  return userId;
}

export async function getAuthenticatedProfile() {
  const userId = await getClerkUserId();

  if (!userId) {
    return { userId: null, profile: null };
  }

  const supabase = createAdminClient();
  const { data: profile, error } = await supabase
    .from("user_profiles")
    .select("id, clerk_user_id, tenant_id, role, display_name, avatar_url, onboarding_complete, default_surface")
    .eq("clerk_user_id", userId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return {
    userId,
    profile: (profile as AuthenticatedProfile | null) ?? null,
  };
}

export function isWorkspaceRole(role: Role | null | undefined) {
  return role === "platform_admin" || role === "tenant_admin" || role === "mission_creator" || role === "analyst";
}

export function isAdminRole(role: Role | null | undefined) {
  return role === "platform_admin" || role === "tenant_admin";
}
