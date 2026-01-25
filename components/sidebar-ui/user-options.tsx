"use client";

import { UserIcon, InfoIcon, LogOutIcon, CircleAlertIcon } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useState } from "react";
import { useProfile } from "@/components/profile/profile-provider";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Spinner } from "../ui/spinner";

export function UserOptions() {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const profile = useProfile();
  if (!profile) return;

  async function signOut() {
    setIsLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) return;
    router.replace("/auth/login");
    setIsLoading(false);
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
            <Dialog>
              <form>
                <DialogTrigger asChild>
                  <Button
                    variant={"ghost"}
                    className="w-full justify-start gap-3 text-red-500 hover:text-red-500"
                  >
                    <LogOutIcon />
                    Logout
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md sm:min-w-[300px]">
                  <DialogHeader className="border-b-2 pb-6">
                    <DialogTitle>
                      <div className="flex flex-row gap-2 items-center">
                        <CircleAlertIcon size={18} />
                        <p className="m-0 p-0">Confirm Logout</p>
                      </div>
                    </DialogTitle>
                  </DialogHeader>
                  <div className="w-full flex flex-col justify-center items-center">
                    <p className="text-muted-foreground m-0 p-0 w-full text-center">
                      Do you really wish to{" "}
                      <span className="font-semibold">logout</span>?
                    </p>
                  </div>
                  <DialogFooter className="border-t-2 pt-6 flex flex-col gap-3 md:gap-0 md:flex-row">
                    <DialogClose asChild>
                      <Button
                        variant="secondary"
                        className="dark:bg-secondary bg-gray-300 hover:bg-gray-200"
                      >
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button
                      variant="destructive"
                      className="bg-red-700 hover:bg-red-600"
                      onClick={() => signOut()}
                    >
                      {isLoading ? <Spinner /> : "Logout"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </form>
            </Dialog>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
