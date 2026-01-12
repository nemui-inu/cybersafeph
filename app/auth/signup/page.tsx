import { FlickeringGrid } from "@/components/ui/shadcn-io/flickering-grid";
import { ShieldUserIcon } from "lucide-react";
import { SignupForm } from "@/components/auth-ui/signup-form";

export default function SignupPage() {
  return (
    <div className="relative h-screen">
      <FlickeringGrid
        className="fixed inset-0"
        squareSize={6}
        gridGap={8}
        flickerChance={0.3}
        color="rgb(0, 128, 128)"
        maxOpacity={0.2}
      />
      <div className="relative z-10 flex min-h-svh flex-col items-center justify-center gap-6 px-6 pt-10 pb-32 md:p-10">
        <div className="w-full max-w-4xl">
          <div className="flex w-full flex-col gap-6">
            <a
              href="#"
              className="flex items-center gap-2 self-center font-medium"
            >
              <div className="flex size-6 items-center justify-center rounded-md">
                <ShieldUserIcon className="size-42" />
              </div>
              CyberSafePH
            </a>
            <SignupForm />
          </div>
        </div>
      </div>
    </div>
  );
}
