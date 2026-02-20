"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { ArrowLeftIcon } from "lucide-react";

interface GoBackButtonProps {
  route?: string;
}

export function GoBackButton({ route }: GoBackButtonProps) {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      type="button"
      onClick={() => router.push(route ?? "/")}
    >
      <ArrowLeftIcon />
      Go Back
    </Button>
  );
}
