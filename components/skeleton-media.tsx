'use client';

import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCard() {
  return (
    <div className="rounded-xl border bg-white shadow-sm p-3 space-y-2 animate-pulse">
      <Skeleton className="h-5 w-2/3" />
      <Skeleton className="aspect-video w-full rounded-md" />
      <Skeleton className="h-3 w-1/3" />
    </div>
  );
}
