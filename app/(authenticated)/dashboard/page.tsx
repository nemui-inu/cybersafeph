"use client";

import { TriangleAlertIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Badge } from "@/components/ui/badge";
import { CybersafeLogo } from "@/components/branding/cybersafe-logo";
import { LoadingSpinner } from "@/components/loading/loading-spinner";

export default function Page() {
  const [profile, setProfile] = useState<{
    first_name: string;
    middle_name: string;
    last_name: string;
    role: string;
    email: string;
    lgu: string;
    department: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchName() {
      const supabase = createClient();

      try {
        setIsLoading(true);
        setError(null);
        const { data, error } = await supabase.rpc("get_profile_data");
        if (error) throw error;
        setProfile(data?.[0] ?? null);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to fetch data.",
        );
      } finally {
        setIsLoading(false);
      }
    }
    fetchName();
  }, []);

  if (!profile)
    return (
      <div className="w-full h-screen flex flex-col gap-4">
        <div className="w-full h-full pb-[100px] flex flex-col md:flex-row gap-4">
          <div
            className="flex-1 h-full bg-muted-foreground/5 rounded-xl"
            hidden={error === null || isLoading}
          >
            <div className="w-full h-full flex flex-col p-6 gap-2 items-center justify-center">
              <TriangleAlertIcon className="text-red-600 size-24" />
              <div className="flex flex-col gap-0 items-center w-full">
                <h1 className="text-xl text-red-600 font-bold">Error</h1>
                <p className="text-red-600">{error}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="w-full h-screen flex flex-col gap-4">
      <div className="w-full h-full pb-[100px] flex flex-col md:flex-row gap-4">
        <div
          className="flex-1 h-full bg-muted-foreground/5 rounded-xl"
          hidden={!isLoading}
        >
          <LoadingSpinner className="mx-auto my-auto w-full h-full" />
        </div>
        <div
          className="flex-1 h-full bg-secondary rounded-xl"
          hidden={error === null || isLoading}
        >
          <div className="w-full h-full flex flex-col p-6 items-center justify-center">
            <p className="text-red-600">Error: {error}</p>
          </div>
        </div>
        <div
          className="flex-1 h-full bg-muted-foreground/5 rounded-xl"
          hidden={isLoading && error === null}
        >
          <div className="w-full h-full flex flex-col p-6 items-center justify-center">
            <CybersafeLogo className="h-24 w-24 text-primary mx-auto mb-4" />
            <p>Welcome to CyberSafePH,</p>
            <h1 className="text-3xl font-bold">
              {profile.first_name} {profile.last_name}
            </h1>
            <div className="w-full flex flex-row gap-2 justify-center items-center mt-2">
              <Badge className="bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-400 hover:bg-teal-600">
                {profile.role}
              </Badge>
              <Badge className="bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-400 hover:bg-amber-600">
                {profile.lgu}
              </Badge>
              <Badge className="bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-400 hover:bg-purple-600">
                {profile.department}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
