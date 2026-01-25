"use client";

import { useProfile } from "@/components/profile/profile-provider";
import { LoadingSpinner } from "@/components/loading/loading-spinner";
import { Badge } from "@/components/ui/badge";

export default function Page() {
  const profile = useProfile();
  if (!profile) return null;

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex flex-col md:flex-row gap-4">
        <div className="flex-1 h-[320px] bg-secondary rounded-xl">
          <div className="w-full h-full flex flex-col gap-2 p-6 items-center justify-center">
            <div className="">
              <p>Welcome to CyberSafePH,</p>
              <h1 className="text-3xl font-bold">
                {profile.first_name} {profile.last_name}
              </h1>
              <Badge className="bg-teal-700 dark:bg-teal-500 mt-2">
                {profile.role.name}
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex-1 h-[320px] bg-secondary rounded-xl p-6">
          <LoadingSpinner className="w-full h-full" />
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row gap-4">
        <div className="flex-1 h-[320px] bg-secondary rounded-xl p-6"></div>
        <div className="flex-1 h-[320px] bg-secondary rounded-xl p-6"></div>
        <div className="flex-1 h-[320px] bg-secondary rounded-xl p-6"></div>
      </div>
    </div>
  );
}
