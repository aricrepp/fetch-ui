import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dog, SearchResponse, Match, allDogs } from "@/types";

const INITIAL_STATE: allDogs = {
  dogBreeds: [],
  allDogs: [],
  searchResults: { resultIds: [], total: 0, next: "", prev: "" },
  dogsFromSearch: [],
  sizeOfDogPage: 25,
  sortedType: "none",
  sortedOrder: "asc",
  activePage: 1,
  selectedDogsMatch: [],
  dogMatch: null,
  searchDogsInput: [],
};

const dogSlice = createSlice({
  name: "dogs",
  initialState: INITIAL_STATE,
  reducers: {
    setDogBreeds: (state, actions: PayloadAction<Array<string>>) => {
      state.dogBreeds = actions.payload;
    },
    setDogObjectInfo: (state, actions: PayloadAction<Dog[]>) => {
      state.allDogs = actions.payload;
    },
    setSizeOfDogPage: (state, actions: PayloadAction<number>) => {
      state.sizeOfDogPage = actions.payload;
    },
    setSortedType: (state, actions: PayloadAction<string>) => {
      state.sortedType = actions.payload;
    },
    setSortedOrder: (state, actions: PayloadAction<string>) => {
      state.sortedOrder = actions.payload;
    },
    setSearchResults: (state, actions: PayloadAction<SearchResponse>) => {
      state.searchResults = actions.payload;
    },
    setDogsFromSearchResults: (state, actions: PayloadAction<Dog[]>) => {
      state.dogsFromSearch = actions.payload;
    },
    addSelectedDogs: (state, actions: PayloadAction<Dog>) => {
      state.selectedDogsMatch.push(actions.payload);
    },
    setDogMatch: (state, actions: PayloadAction<Match>) => {
      const foundDog = state.selectedDogsMatch.find(
        (dog) => dog.id === actions.payload.match
      );
      if (foundDog) state.dogMatch = foundDog;
    },
    resetDogMatch: (state) => {
      state.dogMatch = null;
    },
    findSearchedNameOrZip: (state, actions: PayloadAction<string>) => {
      if (state.allDogs.length) {
        if (Number.isNaN(Number(actions.payload))) {
          state.searchDogsInput = state.allDogs.filter((dog) =>
            dog.name.toLowerCase().startsWith(actions.payload.toLowerCase())
          );
        } else if (!Number.isNaN(Number(actions.payload))) {
          state.searchDogsInput = state.allDogs.filter((dog) =>
            String(dog.zip_code).includes(String(actions.payload))
          );
        }
      }
    },
    resetSearchedNameOrZip: (state) => {
      state.searchDogsInput = [];
    },
  },
});

export const {
  setDogBreeds,
  setDogObjectInfo,
  setSearchResults,
  setDogsFromSearchResults,
  addSelectedDogs,
  setDogMatch,
  resetDogMatch,
  findSearchedNameOrZip,
  resetSearchedNameOrZip,
} = dogSlice.actions;
export default dogSlice.reducer;
