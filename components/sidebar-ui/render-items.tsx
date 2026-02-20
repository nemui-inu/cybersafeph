import { LucideIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";

type Item = {
  title: string;
  url: string;
  icon: LucideIcon;
};

type RenderItemsProps = {
  items: Item[];
  groupLabel?: string;
};

export function RenderItems({ items, groupLabel }: RenderItemsProps) {
  const router = useRouter();

  return (
    <SidebarGroup>
      <SidebarGroupLabel
        className={!groupLabel ? "hidden" : "text-muted-foreground"}
      >
        {groupLabel}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                onClick={() => router.push(item.url)}
                className="hover:bg-teal-500/20 hover:text-teal-800 dark:hover:text-teal-100 transition-colors duration-500"
              >
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
