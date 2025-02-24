"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { PaginationWithLinks } from "@/app/components/ui/pagination-with-links";
import { Label } from "@/app/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import { DualSlider } from "@/app/components/ui/slider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAppSelector, useAppDispatch } from "@/hooks";
import {
  dispatchActionGetAllDogs,
  dispatchActionGetDogs,
  dispatchActionGetDogsMatch,
} from "@/store";
import { useDebounce } from "use-debounce";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import {
  findSearchedNameOrZip,
  resetSearchedNameOrZip,
} from "@/store/dogStore/reducer";

const FormSchema = z.object({
  search: z.union([
    z.literal(""),
    z
      .string()
      .regex(/^[a-zA-Z]+$/, { message: "Cannot contain letters and numbers" }),
    z
      .string()
      .regex(/^\d+$/, { message: "Cannot contain letters and numbers" }),
    z.number(),
  ]),
});

export default function DogsInput() {
  const { dogBreeds, selectedDogsMatch, searchResults } = useAppSelector(
    (state) => state.dog
  );
  const [, setSelectedBreed] = useState<string>("");
  const [selectedSort, setSelectedSort] = useState<string>("breed");
  const [selectedOrder, setSelectedOrder] = useState<string>("asc");
  const [selectedAge, setSelectedAge] = useState<Array<number>>([1, 30]);
  const [, setSelectedSubmit] = useState<string | number>("");
  const [debouncedAge] = useDebounce(selectedAge, 500);
  const isInitialMount = useRef(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const currentSize = parseInt(params.get("size") || "25");
  const currentPage = parseInt(params.get("from") || "1");

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatchActionGetDogs(dispatch).catch((err) => console.error(err));
  }, [dispatch]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    const onAgeChange = (queryAge: number[]) => {
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

    onAgeChange(debouncedAge);
  }, [debouncedAge, dispatch, router, searchParams]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      search: "",
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    setSelectedSubmit(data.search);
    dispatch(findSearchedNameOrZip(data.search as string));
  };

  const handleBreedChange = (query: string) => {
    setSelectedBreed(query);
    const queryArr = [query];
    const params = new URLSearchParams(searchParams);

    if (queryArr && queryArr.length > 0) {
      queryArr.forEach((breed) => {
        params.append("breeds", breed);
      });
    }

    dispatchActionGetAllDogs(dispatch, params.toString()).catch((err) =>
      console.error(err)
    );
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const onSortChange = (querySort: string, queryDirection: string) => {
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
  const handleSortChange = (e: string, type: string) => {
    if (type === "Sort") {
      setSelectedSort(e);
      onSortChange(e, selectedOrder);
    } else {
      setSelectedOrder(e);
      onSortChange(selectedSort, e);
    }
  };

  const handleAgeChange = (e: number[]) => {
    setSelectedAge(e);
  };

  const handleMatch = () => {
    const getDogIDs = selectedDogsMatch.map((dog) => dog.id);
    dispatchActionGetDogsMatch(dispatch, getDogIDs);
  };

  return (
    <div
      id="dog-inputs"
      className="sticky top-8 bg-gray-200 flex flex-col w-[95dvw] justify-center items-center mb-[4em] p-4 z-[10]"
    >
      <Popover>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col justify-center items-center h-[8em] space-y-6"
          >
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl mb-4">
                    Find a dog to adopt!
                  </FormLabel>
                  <span className="flex justify-center items-center gap-2">
                    <PopoverTrigger className="bg-gray-300 h-[45px] w-auto p-2 rounded-md">
                      Filters
                    </PopoverTrigger>
                    <FormControl>
                      <Input
                        placeholder="Search by name or zipcode"
                        className="bg-white w-[700px] h-[45px]"
                        type="search"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          if (e.target.value === "") {
                            dispatch(resetSearchedNameOrZip());
                          }
                        }}
                      />
                    </FormControl>
                    <Button className="h-[45px]" type="submit">
                      Search
                    </Button>
                    <Button
                      className="h-[45px] bg-green-400 text-black hover:bg-green-600"
                      type="button"
                      onClick={handleMatch}
                    >
                      Match Me!
                    </Button>
                  </span>
                  <FormMessage />
                </FormItem>
              )}
            />
            <PopoverContent className="w-[34em]" align="start">
              <span className="flex justify-center items-center gap-6">
                <Select onValueChange={(e) => handleBreedChange(e)}>
                  <SelectTrigger className="w-[120px] bg-white">
                    <SelectValue placeholder="Breeds" />
                  </SelectTrigger>
                  <SelectContent>
                    {dogBreeds.map((breed, index) => (
                      <SelectItem key={index} value={breed}>
                        {breed}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span className="flex flex-col justify-center item-center gap-2 w-[170px]">
                  <span className="flex justify-center items-center gap-1 mx-2">
                    <Label className="w-20 flex justify-center">
                      {selectedAge[0]}
                    </Label>
                    <Label className="w-20 flex justify-center">Age</Label>
                    <Label className="w-20 flex justify-center">
                      {selectedAge[1]}
                    </Label>
                  </span>
                  <DualSlider
                    defaultValue={selectedAge}
                    max={30}
                    min={1}
                    step={1}
                    onValueChange={(e) => handleAgeChange(e)}
                  />
                </span>
                <Select
                  onValueChange={(e) => handleSortChange(e, "Sort")}
                  defaultValue="breed"
                >
                  <SelectTrigger className="w-[140px] bg-white">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="breed">By breed</SelectItem>
                    <SelectItem value="name">By name</SelectItem>
                    <SelectItem value="age">By age</SelectItem>
                  </SelectContent>
                </Select>
                <RadioGroup
                  defaultValue="asc"
                  onValueChange={(e) => handleSortChange(e, "Order")}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="asc" id="asc" />
                    <Label htmlFor="asc">Asc</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="desc" id="desc" />
                    <Label htmlFor="desc">Desc</Label>
                  </div>
                </RadioGroup>
              </span>
            </PopoverContent>
          </form>
        </Form>
      </Popover>
      <span className="w-[60%]">
        <PaginationWithLinks
          page={currentPage}
          pageSize={currentSize}
          totalCount={searchResults.total}
          pageSizeSelectOptions={{
            pageSizeOptions: [25, 50, 100, 300],
          }}
        />
      </span>
    </div>
  );
}
