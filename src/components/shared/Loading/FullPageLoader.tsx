
import { LoaderCircle } from "lucide-react";

export default function FullPageLoader() {
  return (
    <main
      className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-background"
      role="status"
      aria-label="Loading"
    >
      <div className="flex flex-col items-center gap-6">

        {/* Animated Logo */}
        <div className="relative flex size-20 items-center justify-center rounded-3xl bg-primary/10">
          <div className="absolute inset-0 animate-ping rounded-3xl bg-primary/10" />

          <LoaderCircle className="relative size-10 animate-spin text-primary" />
        </div>

        {/* Loading Text */}
        <div className="space-y-2 text-center">
          <h2 className="text-xl font-semibold tracking-tight">
            Loading your workspace
          </h2>

          <p className="text-sm text-muted-foreground">
            Please wait while we prepare everything for you.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="h-1 w-48 overflow-hidden rounded-full bg-muted">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-primary" />
        </div>

      </div>
    </main>
  );
}
