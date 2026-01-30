"use client";
import { UserIcon, InfoIcon, TriangleAlertIcon } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { SignOutButton } from "@/components/sidebar-ui/avatar-popover/signout-button";
import { useState, useEffect } from "react";
import { ProfileData } from "@/types/database";
import { createClient } from "@/lib/supabase/client";

export function UserOptions() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchProfile() {
      try {
        setIsLoading(true);
        setError(null);
        const supabase = createClient();
        const { data, error } = await supabase.rpc("get_profile_data");
        if (error) throw error;
        setProfile(data?.[0] ?? null);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to fetch profile.",
        );
      } finally {
        setIsLoading(false);
      }
    }
    fetchProfile();
  }, []);

  function getInitials(snippet1: string, snippet2: string) {
    const firstChar = snippet1.charAt(0).toUpperCase();
    const secondChar = snippet2.charAt(0).toUpperCase();
    return firstChar + secondChar;
  }

  if (error) {
    return (
      <HoverCard>
        <HoverCardTrigger>
          <Avatar className="h-10 w-10 rounded-lg">
            <AvatarFallback className="rounded-lg">
              <TriangleAlertIcon className="text-red-500" />
            </AvatarFallback>
          </Avatar>
        </HoverCardTrigger>
        <HoverCardContent>
          <div className="flex flex-row gap-2 items-center">
            <TriangleAlertIcon className="text-red-700" size={14} />
            <h1 className="font-semibold text-red-700">Error</h1>
          </div>
          <p className="text-red-700 text-xs">{error}</p>
        </HoverCardContent>
      </HoverCard>
    );
  }

  if (isLoading || !profile) {
    return (
      <Avatar className="h-10 w-10 rounded-lg">
        <AvatarFallback className="rounded-lg">
          <Spinner />
        </AvatarFallback>
      </Avatar>
    );
  }

  return (
    <Popover>
      <PopoverTrigger>
        <Avatar className="h-10 w-10 rounded-lg">
          <AvatarImage src="#" alt={"@" + profile.first_name} />
          <AvatarFallback className="rounded-lg">
            {getInitials(profile.first_name, profile.last_name)}
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="me-4 md:me-6 mt-2 p-0 w-[320px] rounded-lg">
        <div className="flex flex-col">
          <div className="p-4 pb-0 flex flex-row gap-3 align-center overflow-auto">
            <Avatar className="h-14 w-14 rounded-lg">
              <AvatarImage src="#" alt={"@" + profile.first_name} />
              <AvatarFallback className="rounded-lg">
                {getInitials(profile.first_name, profile.last_name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h1 className="font-semibold text-lg overflow-auto">
                {profile.first_name} {profile.last_name}
              </h1>
              <p className="text-sm text-muted-foreground">{profile.email}</p>
            </div>
          </div>
          <div className="w-full flex flex-row flex-wrap gap-2 items-center p-4">
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
          <Separator />
          <div className="flex flex-col px-1 py-2">
            <Button variant={"ghost"} className="justify-start gap-3">
              <UserIcon />
              My Account
            </Button>
            <Button variant={"ghost"} className="justify-start gap-3">
              <InfoIcon />
              App Information
            </Button>
          </div>
          <Separator />
          <SignOutButton />
        </div>
      </PopoverContent>
    </Popover>
  );
}
