import { LoginForm } from "@/components/auth-ui/login-form";
import { FlickeringGrid } from "@/components/ui/shadcn-io/flickering-grid";
import { CybersafeLogo } from "@/components/branding/cybersafe-logo";

export default function LoginPage() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <FlickeringGrid
        className="fixed inset-0"
        squareSize={6}
        gridGap={8}
        flickerChance={0.3}
        color="rgb(0, 128, 128)"
        maxOpacity={0.2}
      />
      <div className="w-full max-w-sm relative z-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <a
            href="#"
            className="flex items-center gap-2 self-center font-medium"
          >
            <div className="flex size-6 items-center justify-center rounded-md">
              <CybersafeLogo className="h-6 w-6 text-primary" />
            </div>
            CyberSafePH
          </a>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
