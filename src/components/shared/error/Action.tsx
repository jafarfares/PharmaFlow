"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw } from "lucide-react";

export default function Action() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button onClick={() => window.location.reload()}>
        <RefreshCw className="mr-2 size-4" />
        Try again
      </Button>

      <Button variant="outline" onClick={() => window.history.back()}>
        <ArrowLeft className="mr-2 size-4" />
        Go back
      </Button>
    </div>
  );
}
