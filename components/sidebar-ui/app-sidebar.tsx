"use client";

import { ShieldUserIcon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  AdminItemsPrimary,
  AdminConfiguration,
  AdminPages,
  AdminReporting,
} from "@/components/sidebar-ui/admin-items";
import { useRouter } from "next/navigation";

export function AppSidebar() {
  const router = useRouter();

  return (
    <Sidebar
      collapsible="icon"
      className="border-none mt-0 w-[280px] min-w-[60px] relative ps-1"
    >
      <SidebarHeader className="bg-background w-full mt-0 pt-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              onClick={() => router.push("/dashboard")}
            >
              <div className="flex flex-row gap-3 items-center">
                <div className="p-1 bg-teal-400 dark:bg-teal-700 rounded-lg">
                  <ShieldUserIcon size={24} className="" />
                </div>
                <h1 className="text-lg font-semibold">CyberSafePH</h1>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-background border-none">
        <AdminItemsPrimary />
        <AdminPages />
        <AdminReporting />
        <AdminConfiguration />
      </SidebarContent>
    </Sidebar>
  );
}
