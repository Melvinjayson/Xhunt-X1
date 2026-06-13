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

// Preview build — no auth provider. Returns a stable mock user ID.
export async function getClerkUserId() {
  return "preview-user";
}

export async function getAuthenticatedProfile() {
  const supabase = createAdminClient();
  const { data: profile } = await supabase
    .from("user_profiles")
    .select("id, clerk_user_id, tenant_id, role, display_name, avatar_url, onboarding_complete, default_surface")
    .limit(1)
    .maybeSingle();

  return {
    userId: "preview-user",
    profile: (profile as AuthenticatedProfile | null) ?? null,
  };
}

export function isWorkspaceRole(role: Role | null | undefined) {
  return role === "platform_admin" || role === "tenant_admin" || role === "mission_creator" || role === "analyst";
}

export function isAdminRole(role: Role | null | undefined) {
  return role === "platform_admin" || role === "tenant_admin";
}
