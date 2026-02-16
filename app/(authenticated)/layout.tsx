import { Suspense } from "react";
import AuthenticatedShell from "./authenticated-shell";
import { LoadingSpinner } from "@/components/loading/loading-spinner";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<LoadingSpinner className="w-full h-screen" />}>
      <AuthenticatedShell>
        <div className="w-full">{children}</div>
      </AuthenticatedShell>
    </Suspense>
  );
}
