import Image from "next/image";
import { CybersafeLogo } from "@/components/branding/cybersafe-logo";

export default function Page() {
  return (
    <div className="w-full h-screen flex flex-col gap-4">
      <div className="w-full h-full pb-[100px] flex flex-col md:flex-row gap-4">
        <div className="flex-1 h-full bg-muted-foreground/5 rounded-xl">
          <div className="w-full h-full flex flex-col p-6 items-center justify-between">
            <Image
              className="opacity-75"
              src="/digital-nomad.svg"
              width={300}
              height={300}
              alt="digital-nomad"
            />
            <div className="flex flex-col items-center text-center mt-[-250px]">
              <h1 className="text-2xl font-semibold">
                This page is under construction 🛠️
              </h1>
              <p className="text-sm text-muted-foreground">
                Please come back again later
              </p>
            </div>
            <div className="flex flex-row gap-2 items-center text-muted-foreground">
              <CybersafeLogo className="h-7 w-7" />
              <h1 className="font-semibold">CyberSafePH</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
