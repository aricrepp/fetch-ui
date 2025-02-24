"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import LoadingCards from "./dogCards/loading";
import LoadingInput from "./dogInput/loading";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/hooks";
import { dispatchActionGetAllDogs } from "@/store";
import DogMatch from "./dogMatch/page";

const DynamicDogCards = dynamic(() => import("./dogCards/page"), {
  loading: () => <LoadingCards />,
  ssr: false,
});

const DynamicDogInput = dynamic(() => import("./dogInput/page"), {
  loading: () => <LoadingInput />,
  ssr: false,
});

export default function Dashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatchActionGetAllDogs(dispatch).catch((err) => console.error(err));
  }, [dispatch]);

  const handleBreedChange = (query: string[]) => {
    const params = new URLSearchParams(searchParams);

    if (query && query.length > 0) {
      query.forEach((breed) => {
        params.append("breeds", breed);
      });
    }

    dispatchActionGetAllDogs(dispatch, params.toString()).catch((err) =>
      console.error(err)
    );
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleSortChange = (querySort: string, queryDirection: string) => {
    const params = new URLSearchParams(searchParams);

    if (querySort) {
      params.set("sort", `${querySort}${":"}${queryDirection}`);
    } else {
      params.delete("sort");
    }
    dispatchActionGetAllDogs(dispatch, params.toString()).catch((err) =>
      console.error(err)
    );
    router.push(`?${params.toString()}`, { scroll: false });
  };
  const handleAgeChange = (queryAge: number[]) => {
    const params = new URLSearchParams(searchParams);

    if (queryAge) {
      params.set("ageMin", queryAge[0].toString());
      params.set("ageMax", queryAge[1].toString());
    } else {
      params.delete("ageMin");
      params.delete("ageMax");
    }

    dispatchActionGetAllDogs(dispatch, params.toString()).catch((err) =>
      console.error(err)
    );
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <section
      id="dog-dashboard"
      className="flex flex-col justify-start h-dvh items-center bg-gray-200 font-[family-name:var(--font-geist-sans)] py-10 overflow-x-hidden overflow-y-scroll"
    >
      <DynamicDogInput
        onBreedChange={handleBreedChange}
        onSortChange={handleSortChange}
        onAgeChange={handleAgeChange}
      />
      <DynamicDogCards />
      <DogMatch />
    </section>
  );
}
