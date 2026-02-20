"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { ArrowLeftIcon } from "lucide-react";

interface GoBackButtonProps {
  route?: string;
  title?: string;
}

export function GoBackButton({ route, title }: GoBackButtonProps) {
  const router = useRouter();

  return (
    <Button
      className="h-9"
      variant="outline"
      type="button"
      onClick={() => router.push(route ?? "/")}
    >
      <ArrowLeftIcon />
      {title ?? "Go Back"}
    </Button>
  );
}
