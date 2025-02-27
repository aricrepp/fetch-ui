"use client";

import { Suspense } from "react";
import DogMatch from "./dogMatch/page";
import DogsInput from "./dogInput/page";
import DogCards from "./dogCards/page";
import {
  useGetAllDogsQuery,
  useGetDogBreedsQuery,
} from "@/utils/service/rtkQuery";

export default function Dashboard() {
  const { data: breedData } = useGetDogBreedsQuery();
  const { data: searchData } = useGetAllDogsQuery();

  return (
    <section
      id="dog-dashboard"
      className="flex flex-col justify-start h-dvh items-center bg-gray-200 font-[family-name:var(--font-geist-sans)] py-10 overflow-x-hidden overflow-y-scroll"
    >
      <Suspense>
        <DogsInput dogBreeds={breedData} />
      </Suspense>
      <DogCards searchData={searchData} />
      <DogMatch />
    </section>
  );
}
