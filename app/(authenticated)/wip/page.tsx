import Image from "next/image";
import { CybersafeLogo } from "@/components/branding/cybersafe-logo";

export default function Page() {
  return (
    <div className="w-full h-screen flex flex-col gap-4">
      <div className="w-full h-full pb-[100px] flex flex-col md:flex-row gap-4">
        <div className="flex-1 h-full bg-muted-foreground/5 rounded-xl">
          <div className="w-full h-full flex flex-col gap-6 p-6 items-center justify-center">
            <div className="flex flex-row gap-2 items-center text-foreground">
              <CybersafeLogo className="h-24 w-24" />
            </div>
            <div className="flex flex-col items-center text-center">
              <h1 className="text-2xl font-semibold">
                This page is under construction 🛠️
              </h1>
              <p className="text-sm text-muted-foreground">
                Please come back again later
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
