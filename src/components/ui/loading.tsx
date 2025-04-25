import { Suspense } from "react";

import { Para } from "../typography/para";
import { LoadingSpinner } from "./loading-spinner";

interface LoadingProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  message?: string;
}

export function Loading({
  children,
  fallback,
  message = "Loading...",
}: LoadingProps) {
  const defaultFallback = (
    <div className="flex h-[50vh] w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <LoadingSpinner size="lg" />
        <Para>{message}</Para>
      </div>
    </div>
  );

  return <Suspense fallback={fallback || defaultFallback}>{children}</Suspense>;
}
