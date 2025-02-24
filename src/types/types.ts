// Interfaces

export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export interface Match {
  match: string;
}

export interface Location {
  zip_code: string;
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  county: string;
}

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface ToastNotification {
  message?: string;
}

export interface Auth {
  session: boolean;
}

export interface allDogs {
  dogBreeds: Array<string>;
  allDogs: Dog[];
  searchResults: SearchResponse;
  dogsFromSearch: Dog[];
  sizeOfDogPage: number;
  sortedType: string;
  sortedOrder: string;
  activePage: number;
  selectedDogsMatch: Dog[];
  dogMatch: Dog | null;
  searchDogsInput: Dog[];
}

export interface SearchResponse {
  resultIds: string[];
  total: number;
  next: string;
  prev: string;
}
