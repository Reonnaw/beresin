"use client";

import { catchError, type ErrorInfo } from "next/error";

import { Button } from "@/components/ui/button";

function LoadErrorFallback({ message }: { message: string }, { retry }: ErrorInfo) {
  return (
    <div role="alert" className="flex flex-col items-start gap-3 rounded-sm border border-dashed border-danger/40 p-4">
      <p className="text-sm">{message}</p>
      <Button variant="secondary" size="sm" onClick={() => retry()}>
        Coba lagi
      </Button>
    </div>
  );
}

/** Keeps a failed data block from taking the whole homepage down with it. */
export const LoadErrorBoundary = catchError(LoadErrorFallback);
