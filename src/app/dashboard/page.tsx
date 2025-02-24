"use client";

import { Suspense, useEffect } from "react";
import dynamic from "next/dynamic";
import LoadingCards from "./dogCards/loading";
import { useAppDispatch } from "@/hooks";
import { dispatchActionGetAllDogs } from "@/store";
import DogMatch from "./dogMatch/page";
import DogsInput from "./dogInput/page";

const DynamicDogCards = dynamic(() => import("./dogCards/page"), {
  loading: () => <LoadingCards />,
  ssr: false,
});

export default function Dashboard() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatchActionGetAllDogs(dispatch).catch((err) => console.error(err));
  }, [dispatch]);

  return (
    <section
      id="dog-dashboard"
      className="flex flex-col justify-start h-dvh items-center bg-gray-200 font-[family-name:var(--font-geist-sans)] py-10 overflow-x-hidden overflow-y-scroll"
    >
      <Suspense>
        <DogsInput />
      </Suspense>
      <DynamicDogCards />
      <DogMatch />
    </section>
  );
}
