import { createClient } from "@/lib/supabase/server";
import { ProfileProvider } from "@/components/profile/profile-provider";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar-ui/app-sidebar";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { UserOptions } from "@/components/sidebar-ui/avatar-popover/user-options";

import { redirect } from "next/navigation";
import { ProfileContextValue } from "@/types/database";

export default async function AuthenticatedShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) redirect("/auth/login");

  const { data: prof, error: profErr } = await supabase.rpc("get_profile_data");
  const p = prof?.[0];

  if (profErr || !p) redirect("/auth/login");

  const profile: ProfileContextValue = {
    id: user.id,
    email: p.email ?? user.email ?? "",
    role: p.role ?? "Viewer",
    lgu: p.lgu ?? null,
    department: p.department ?? null,
    isActive: p.is_active ?? false,
    isVerified: p.is_verified ?? false,
  };

  return (
    <SidebarProvider>
      <ProfileProvider profile={profile}>
        <AppSidebar />
        <main className="w-full px-4 md:p-0 md:pe-6 md:ps-1">
          <div className="w-full mt-3 flex flex-row items-center justify-between mb-4 md:mb-3">
            <div>
              <SidebarTrigger />
            </div>
            <div className="flex gap-2 items-center">
              <ThemeSwitcher />
              <UserOptions />
            </div>
          </div>
          <div className="">{children}</div>
        </main>
      </ProfileProvider>
    </SidebarProvider>
  );
}
