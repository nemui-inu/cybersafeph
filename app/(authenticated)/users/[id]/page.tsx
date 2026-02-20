import { GoBackButton } from "@/components/etc-buttons/go-back-button";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="w-full h-screen flex flex-col gap-4">
      <div className="w-full h-full pb-[100px] flex flex-col md:flex-row gap-4">
        <div className="flex-1 h-full bg-muted-foreground/5 rounded-xl">
          <div className="w-full h-full flex flex-col p-6 items-center justify-center">
            <GoBackButton route="/users" />
            id: {id}
          </div>
        </div>
      </div>
    </div>
  );
}
