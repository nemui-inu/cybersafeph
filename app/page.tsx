import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <RedirectGate />
    </Suspense>
  );
}

async function RedirectGate() {
  const { createClient } = await import("@/lib/supabase/server");
  const { redirect } = await import("next/navigation");

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  redirect(user ? "/dashboard" : "/auth/login");
  return null;
}
