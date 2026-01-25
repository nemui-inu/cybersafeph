import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";

export function LoadingSpinner({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex items-center justify-center p-0 m-0", className)}
      {...props}
    >
      <Spinner className="h-full w-full max-h-20 p-0 m-0" />
    </div>
  );
}
