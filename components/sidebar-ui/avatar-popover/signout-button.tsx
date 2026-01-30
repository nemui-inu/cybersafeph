"use client";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { CircleAlertIcon, LogOutIcon } from "lucide-react";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function SignOutButton({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  async function signOut() {
    setIsLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) return;
    router.replace("/auth/login");
    setIsLoading(false);
  }
  return (
    <div className={cn("flex flex-col px-1 py-2", className)} {...props}>
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
  );
}
