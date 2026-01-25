"use client";

import { useProfile } from "@/components/profile/profile-provider";
import { LoadingSpinner } from "@/components/loading/loading-spinner";

export default function Page() {
  const profile = useProfile();
  if (!profile) return null;

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex flex-row gap-4">
        <div className="flex-1 h-[320px] bg-secondary rounded-xl">
          <div className="w-full flex flex-col gap-2 p-4">
            <p>Welcome, {profile.first_name}</p>
            <p>You are a/an {profile.role}</p>
          </div>
        </div>
        <div className="flex-1 h-[320px] bg-secondary rounded-xl">
          <LoadingSpinner className="w-full h-full" />
        </div>
      </div>
      <div className="w-full flex flex-row gap-4">
        <div className="flex-1 h-[320px] bg-secondary rounded-xl"></div>
        <div className="flex-1 h-[320px] bg-secondary rounded-xl"></div>
        <div className="flex-1 h-[320px] bg-secondary rounded-xl"></div>
      </div>
    </div>
  );
}
