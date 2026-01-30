import { createClient } from "@/lib/supabase/server";
import { ProfileProvider } from "@/components/profile/profile-provider";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar-ui/app-sidebar";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { UserOptions } from "@/components/sidebar-ui/avatar-popover/user-options";

import { redirect } from "next/navigation";

function decodeJwtPayload(token: string) {
  const payload = token.split(".")[1];
  return JSON.parse(Buffer.from(payload, "base64").toString("utf8"));
}

export default async function AuthenticatedShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) redirect("/auth/login");

  const jwt = decodeJwtPayload(session.access_token);

  const profile = {
    id: session.user.id,
    email: session.user.email ?? "",
    role: jwt.csp_role ?? "Staff",
    lguId: jwt.csp_lgu_id as string | null,
    departmentId: jwt.csp_department_id as string | null,
    isActive: Boolean(jwt.csp_is_active),
    isVerified: Boolean(jwt.csp_is_verified),
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
