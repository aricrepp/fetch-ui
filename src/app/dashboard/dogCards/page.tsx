/* eslint-disable @next/next/no-img-element */
"use client";

import { useAppSelector } from "@/hooks";
import { useEffect, useState } from "react";
import { Dog } from "@/types";
import { IoIosCheckmark } from "react-icons/io";
import { useAppDispatch } from "@/hooks";
import { addSelectedDogs } from "@/store/dogStore/reducer";

export default function DogCards() {
  const { allDogs, searchDogsInput } = useAppSelector((state) => state.dog);
  const dispatch = useAppDispatch();
  const [selectedDogs, setSelectedDogs] = useState<Array<string>>([]);
  const [visibleDogs, setVisibleDogs] = useState<Dog[]>(allDogs);

  useEffect(() => {
    if (searchDogsInput.length > 0) {
      setVisibleDogs(searchDogsInput);
    } else if (!searchDogsInput.length) {
      setVisibleDogs(allDogs);
    }
  }, [allDogs, searchDogsInput]);

  const handleClick = (dog: Dog) => {
    setSelectedDogs((prevSelected) =>
      prevSelected.includes(dog.id)
        ? prevSelected.filter((id) => id !== dog.id)
        : [...prevSelected, dog.id]
    );

    dispatch(addSelectedDogs(dog));
  };

  const findIfSelected = (dog: Dog) => {
    return selectedDogs.includes(dog.id);
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {visibleDogs.map((dog, index) => (
        <div
          key={index}
          className={`relative flex justify-start items-center w-[400px] h-[150px] gap-4 bg-white rounded-xl hover:border hover:border-4 hover:border-green-400 ${
            findIfSelected(dog) ? "border border-green-400 border-4" : ""
          }`}
          onClick={() => handleClick(dog)}
        >
          <div className="ml-8">
            <img
              src={dog.img}
              alt={dog.name}
              className="w-[80px] h-[80px] rounded-full"
            />
          </div>
          <div>
            <span className="flex justify-start items-center gap-4">
              <h5 className="text-2xl">{dog.name}</h5>
              <p className="text-sm ">{dog.age} yrs old</p>
            </span>
            <p className="text-sm">Breed: {dog.breed}</p>
            <p className="text-xs">Zipcode: {dog.zip_code}</p>
          </div>
          <span
            className={`absolute -top-1 -right-1 flex justify-center items-center h-[30px] w-[30px] rounded-tr-2xl rounded-tl-sm rounded-br-sm rounded-bl-2xl bg-green-400 text-xs ${
              findIfSelected(dog) ? "block" : "hidden"
            }`}
          >
            <IoIosCheckmark className="text-2xl text-white" />
          </span>
        </div>
      ))}
    </div>
  );
}
