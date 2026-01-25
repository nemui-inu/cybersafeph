"use client";

import { UserIcon, InfoIcon, LogOutIcon } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import { useProfile } from "@/components/profile/profile-provider";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function UserOptions() {
  const router = useRouter();

  const profile = useProfile();
  if (!profile) return;

  async function signOut() {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) return;
    router.replace("/auth/login");
  }

  function getInitials(snippet1: string, snippet2: string) {
    const firstChar = snippet1.charAt(0).toUpperCase();
    const secondChar = snippet2.charAt(0).toUpperCase();
    return firstChar + secondChar;
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
          <div className="p-4 flex flex-row gap-3 align-center overflow-auto">
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
          <div className="flex flex-col px-1 py-2">
            <Button
              variant={"ghost"}
              className="justify-start gap-3 text-red-500 hover:text-red-500"
              onClick={() => signOut()}
            >
              <LogOutIcon />
              Logout
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
