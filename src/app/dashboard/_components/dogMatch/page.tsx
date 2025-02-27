"use client";
/* eslint-disable @next/next/no-img-element */
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { resetDogMatch } from "@/store/dogStore/reducer";

export default function DogMatch() {
  const [visible, setVisible] = useState<boolean>(false);
  const { dogMatch } = useAppSelector((state) => state.dog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setVisible(true);
  }, [dogMatch]);

  const handleMatchClick = () => {
    setVisible(false);
    dispatch(resetDogMatch());
  };

  if (!dogMatch) {
    return null;
  }

  return (
    <>
      {!visible ? (
        <></>
      ) : (
        <div className="fixed bottom-2 right-2  flex flex-col justify-center items-center gap-2 animate-bounce  z-50">
          <h4 className="text-black">You matched with {dogMatch.name}!</h4>
          <div
            className={`flex justify-start items-center w-[400px] h-[150px] gap-4 bg-white rounded-xl border border-4 border-green-400`}
          >
            <div className="ml-8">
              <img
                src={dogMatch.img}
                alt={dogMatch.name}
                className="w-[80px] h-[80px] rounded-full"
              />
            </div>
            <div>
              <span className="flex justify-start items-center gap-4">
                <h5 className="text-2xl">{dogMatch.name}</h5>
                <p className="text-sm ">{dogMatch.age} yrs old</p>
              </span>
              <p className="text-sm">Breed: {dogMatch.breed}</p>
              <p className="text-xs">Zipcode: {dogMatch.zip_code}</p>
            </div>
            <span
              className={`absolute top-8 right-0.5 flex justify-center items-center h-[30px] w-[30px] rounded-tr-2xl rounded-tl-sm rounded-br-sm rounded-bl-2xl bg-green-400 text-xs`}
            >
              <button onClick={() => handleMatchClick()}>
                <IoIosClose className="text-2xl text-white" />
              </button>
            </span>
          </div>
        </div>
      )}
    </>
  );
}
