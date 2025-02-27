"use client";

import { Suspense } from "react";
import DogMatch from "./_components/dogMatch/page";
import DogsInput from "./_components/dogInput/page";
import DogCards from "./_components/dogCards/page";
import {
  useGetAllDogsQuery,
  useGetDogBreedsQuery,
} from "@/utils/service/rtkQuery";
import LoadingCards from "./_components/dogCards/loading";

export default function Dashboard() {
  const { data: breedData } = useGetDogBreedsQuery();
  const { data: searchData } = useGetAllDogsQuery();

  if (!searchData)
    return (
      <section
        id="dog-dashboard"
        className="flex flex-col justify-start h-dvh items-center bg-gray-200 font-[family-name:var(--font-geist-sans)] py-10 overflow-x-hidden overflow-y-scroll"
      >
        <Suspense>
          <DogsInput dogBreeds={breedData} />
        </Suspense>
        <LoadingCards />
        <DogMatch />
      </section>
    );

  return (
    <section
      id="dog-dashboard"
      className="flex flex-col justify-start h-dvh items-center bg-gray-200 font-[family-name:var(--font-geist-sans)] py-10 overflow-x-hidden overflow-y-scroll"
    >
      <Suspense>
        <DogsInput dogBreeds={breedData} />
      </Suspense>
      <Suspense>
        <DogCards searchData={searchData} />
      </Suspense>
      <DogMatch />
    </section>
  );
}
