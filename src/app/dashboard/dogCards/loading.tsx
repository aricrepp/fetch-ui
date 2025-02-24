"use client";
import { useState } from "react";
import { Skeleton } from "@/app/components/ui/skeleton";

export default function LoadingCards() {
  const [defaultDogs] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  return (
    <div className="grid grid-cols-3 gap-4">
      {defaultDogs.map((dog, index) => (
        <div
          key={index}
          className="flex justify-center items-center gap-3 w-[300px] h-[150px] bg-white rounded"
        >
          <div>
            <Skeleton className="h-12 w-12 rounded-full" />
          </div>
          <div className="flex flex-col justify-center items-center gap-3">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  );

  // return <div>Loading . . .</div>;
}
