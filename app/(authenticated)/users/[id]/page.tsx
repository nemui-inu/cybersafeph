import {
  BadgeCheckIcon,
  BuildingIcon,
  HistoryIcon,
  LandmarkIcon,
  MailIcon,
  UserRoundPenIcon,
  CheckCircle2Icon,
  ClockIcon,
  FileTextIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { GoBackButton } from "@/components/etc-buttons/go-back-button";
import { CybersafeLogo } from "@/components/branding/cybersafe-logo";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { VerticalTimeline } from "@/components/timeline/vertical-timeline";

async function fetchData(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_profile_by_id", { p_id: id });

  if (error) throw new Error(error.message);

  return data?.[0] ?? null;
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const profile = await fetchData(id);

  const items = [
    {
      id: "1",
      title: "Request received",
      description: "Case intake form submitted by client.",
      time: "Feb 21, 2026 · 9:12 AM",
      badge: "Intake",
      icon: <FileTextIcon className="size-4" />,
    },
    {
      id: "2",
      title: "Assigned to IT Officer",
      description: "Assigned to M. Dela Merced for initial review.",
      time: "Feb 21, 2026 · 10:03 AM",
      badge: "Assigned",
      icon: <ClockIcon className="size-4" />,
    },
    {
      id: "3",
      title: "Verified",
      description: "Documents validated and marked as verified.",
      time: "Feb 21, 2026 · 11:40 AM",
      badge: "Done",
      icon: <CheckCircle2Icon className="size-4" />,
    },
  ];

  return (
    <div className="w-full flex flex-col gap-4 mb-20">
      <div className="flex flex-col md:flex-row gap-4 md:justify-between items-center">
        <h1 className="text-xl font-semibold">Profile Page</h1>
        <div className="w-full md:w-auto flex flex-row justify-between md:justify-normal gap-2 items-center">
          <GoBackButton route="/users" title="Go Back to Users" />
          <Button className="h-[36px] w-full md:w-auto">
            <UserRoundPenIcon />
            Edit Profile
          </Button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col gap-4">
          <div className="bg-muted-foreground/5 rounded-xl p-6">
            <div className="w-full flex flex-col">
              <div className="w-full flex flex-col gap-4 items-center">
                <CybersafeLogo className="text-foreground w-16 h-auto" />
                <div className="w-full flex flex-col gap-0 items-center">
                  <div className="flex flex-row gap-2 items-center">
                    <h1 className="font-medium text-lg">
                      {profile.first_name} {profile.middle_name ?? ""}{" "}
                      {profile.last_name}
                    </h1>
                    <BadgeCheckIcon size={17} />
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {profile.role}
                  </p>
                </div>
              </div>

              <div className="bg-background grid grid-cols-3 divide-x rounded-md border text-center my-4">
                <div className="py-2 px-8 flex flex-col items-center justify-center">
                  <h5 className="text-lg font-semibold">100</h5>
                  <p className="text-muted-foreground text-xs">Report/s</p>
                </div>
                <div className="py-2 px-8 flex flex-col items-center justify-center">
                  <h5 className="text-lg font-semibold">100</h5>
                  <p className="text-muted-foreground text-xs">Response/s</p>
                </div>
                <div className="py-4 px-8 flex flex-col items-center justify-center">
                  <h5 className="text-lg font-semibold">100</h5>
                  <p className="text-muted-foreground text-xs">
                    Contribution/s
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <div className="flex flex-row gap-2 items-center">
                <MailIcon size={18} />
                {profile.email}
              </div>
              <div className="flex flex-row gap-2 items-center">
                <LandmarkIcon size={18} />
                {profile.lgu}
              </div>
              <div className="flex flex-row gap-2 items-center">
                <BuildingIcon size={18} />
                {profile.department ?? "Undefined"}
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <div className="w-full bg-muted-foreground/5 rounded-xl p-6">
            <div className="flex flex-col gap-6">
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row gap-2 items-center">
                  <HistoryIcon size={18} />
                  <h2 className="font-semibold">Recent Activity</h2>
                </div>
                <Link
                  className="text-xs text-muted-foreground underline"
                  href="/"
                >
                  View All
                </Link>
              </div>
              <div>
                <VerticalTimeline items={items} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
