import {
  ChartColumnBigIcon,
  SettingsIcon,
  LandmarkIcon,
  UsersIcon,
  ScrollTextIcon,
  FileClockIcon,
} from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";

export function AdminItemsPrimary() {
  const items = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: ChartColumnBigIcon,
    },
  ];

  const router = useRouter();

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton onClick={() => router.push(item.url)}>
                <item.icon />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export function AdminPages() {
  const pages = [
    {
      title: "LGUs",
      url: "#",
      icon: LandmarkIcon,
    },
    {
      title: "Users",
      url: "#",
      icon: UsersIcon,
    },
  ];

  const router = useRouter();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Pages</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {pages.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton onClick={() => router.push(item.url)}>
                <item.icon />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export function AdminReporting() {
  const reporting = [
    {
      title: "Reports",
      url: "#",
      icon: ScrollTextIcon,
    },
    {
      title: "Audit Logs",
      url: "#",
      icon: FileClockIcon,
    },
  ];

  const router = useRouter();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Reporting</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {reporting.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton onClick={() => router.push(item.url)}>
                <item.icon />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export function AdminConfiguration() {
  const configuration = [
    {
      title: "System Settings",
      url: "#",
      icon: SettingsIcon,
    },
  ];

  const router = useRouter();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Configuration</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {configuration.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton onClick={() => router.push(item.url)}>
                <item.icon />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
