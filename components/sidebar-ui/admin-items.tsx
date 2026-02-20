import {
  ChartColumnBigIcon,
  SettingsIcon,
  LandmarkIcon,
  UsersIcon,
  ScrollTextIcon,
  FileClockIcon,
} from "lucide-react";
import { RenderItems } from "./render-items";

export function AdminItemsPrimary() {
  const label = "Overview";
  const items = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: ChartColumnBigIcon,
    },
  ];

  return <RenderItems items={items} groupLabel={label} />;
}

export function AdminPages() {
  const label = "Pages";
  const pages = [
    {
      title: "LGUs",
      url: "/wip",
      icon: LandmarkIcon,
    },
    {
      title: "Users",
      url: "/users",
      icon: UsersIcon,
    },
  ];

  return <RenderItems items={pages} groupLabel={label} />;
}

export function AdminReporting() {
  const label = "Reporting";
  const reporting = [
    {
      title: "Reports",
      url: "/wip",
      icon: ScrollTextIcon,
    },
    {
      title: "Audit Logs",
      url: "/wip",
      icon: FileClockIcon,
    },
  ];

  return <RenderItems items={reporting} groupLabel={label} />;
}

export function AdminConfiguration() {
  const label = "Configuration";
  const configuration = [
    {
      title: "System Settings",
      url: "/wip",
      icon: SettingsIcon,
    },
  ];

  return <RenderItems items={configuration} groupLabel={label} />;
}
