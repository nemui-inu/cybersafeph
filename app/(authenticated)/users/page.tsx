import { createClient } from "@/lib/supabase/server";
import { columns } from "@/components/data-tables/user-management/col-def";
import { DataTable } from "@/components/data-tables/data-table";

import type { ProfileData } from "@/types/database";

async function getProfiles(): Promise<ProfileData[] | []> {
  const supabase = await createClient();
  try {
    const { data: profiles, error } = await supabase.rpc("get_profile_all");
    if (error) throw error;
    return profiles;
  } catch (error) {
    console.error(
      error instanceof Error
        ? error.message
        : "An unexpected error occured while fetching profiles.",
    );
  }
  return [];
}

export default async function Page() {
  const data = await getProfiles();

  return (
    <div className="w-full flex bg-muted-foreground/5 rounded-lg p-4">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
