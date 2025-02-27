"use client";

import { Skeleton } from "@/app/components/ui/skeleton";

export default function LoadingInput() {
  return (
    <div
      id="dog-inputs"
      className="sticky top-14 bg-gray-200 flex justify-center items-center mt-[4em] mb-[4em] z-[10]"
    >
      <div className="flex flex-col justify-center items-center w-[95dvw] h-[12em] space-y-6">
        <Skeleton className="h-4 w-[200px]" />
        <span className="flex justify-center items-center gap-4">
          <Skeleton className="h-4 w-[200px] rounded" />
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[200px]" />
        </span>
      </div>
    </div>
  );

  // return <div>Loading . . .</div>;
}
