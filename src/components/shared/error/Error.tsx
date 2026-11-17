
"use client";

import { AlertTriangle} from "lucide-react";

import Action from "./Action";
type StaffErrorProps = {
  message: string;
};

function Error({ message }: StaffErrorProps) {
  return (
    <main
      className="fixed inset-0 z-[100] flex min-h-screen items-center justify-center bg-background p-6"
      role="alert"
    >
      <div className="w-full max-w-lg text-center">
        {/* Error Icon */}
        <div className="mx-auto mb-7 flex size-24 items-center justify-center rounded-full bg-destructive/10">
          <div className="flex size-16 items-center justify-center rounded-full bg-destructive/15">
            <AlertTriangle className="size-9 text-destructive" />
          </div>
        </div>

        {/* Error Content */}
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-destructive">
          Error Occurred
        </p>

        <h1 className="mb-3 text-3xl font-bold tracking-tight">
          Something went wrong!
        </h1>

        <p className="mx-auto mb-8 max-w-md text-sm leading-7 text-muted-foreground">
          We couldnt complete your request. Please try again.
        </p>

        {/* Error Message */}
        <div className="mb-8 rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-muted-foreground">
          {message}
        </div>

        {/* Actions */}
        <Action />

        <p className="mt-10 text-xs text-muted-foreground">
          If the problem persists, please contact support.
        </p>
      </div>
    </main>
  );
}
export default Error
