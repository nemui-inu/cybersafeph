import { createClient } from "@/lib/supabase/server";
import { ProfileProvider } from "@/components/profile/profile-provider";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar-ui/app-sidebar";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { UserOptions } from "@/components/sidebar-ui/user-options";

import { redirect } from "next/navigation";

export default async function AuthenticatedShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  let profile;

  try {
    const { data, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;

    const user = data.user;
    if (!user) {
      redirect("/auth/login");
      return;
    }

    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();
    if (profileError) throw profileError;

    if (profileData && profileData.is_active == false) {
      redirect("/auth/login");
      return;
    }

    profile = profileData;
  } catch (error: unknown) {
    console.error("Auth/Profile error: ", error);
    redirect("/auth/login");
  }

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
