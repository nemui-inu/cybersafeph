import * as React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ClockIcon } from "lucide-react";

export type TimelineItem = {
  id: string;
  title: string;
  description?: string;
  time?: string;
  badge?: string;
  icon?: React.ReactNode;
};

export function VerticalTimeline({
  items,
  className,
}: {
  items: TimelineItem[];
  className?: string;
}) {
  items = items.reverse();
  return (
    <div className={cn("relative ps-2", className)}>
      <ol className="relative space-y-4 border-s">
        {items.map((item) => {
          return (
            <li key={item.id} className="relative pl-4">
              <div className="absolute left-[-.9em] top-0 size-7 border flex items-center justify-center p-1 rounded-full bg-muted">
                {item.icon ?? (
                  <span className="size-2 rounded-full bg-foreground" />
                )}
              </div>
              <Card className="p-4 bg-inherit border-none pt-1 shadow-none flex flex-col gap-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold">{item.title}</h3>
                    {item.badge && (
                      <Badge
                        variant="secondary"
                        className="bg-gray-200 dark:bg-secondary"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                  {item.time && (
                    <div className="flex flex-row gap-2 items-center text-muted-foreground">
                      <ClockIcon size={12} className="mb-[1px]" />
                      <p className="text-xs">{item.time}</p>
                    </div>
                  )}
                </div>

                {item.description && (
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                )}
              </Card>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
