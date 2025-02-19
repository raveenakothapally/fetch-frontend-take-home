import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email(),
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
});

export const SearchBreedFormSchema = z.object({
  breeds: z
    .string()
    .min(3, { message: "Dog breed name must be at least 3 characters" }),
  next: z.string().optional(),
  prev: z.string().optional(),
});

export const MatchFormSchema = z.object({
  dogs: z
    .array(
      z.object({
        age: z.number(),
        breed: z.string(),
        id: z.string(),
        img: z.string(),
        name: z.string(),
        zip_code: z.string(),
      })
    )
    .min(1),
});

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface Dog {
  age: number;
  breed: string;
  id: string;
  img: string;
  name: string;
  zip_code: string;
}

export interface DogSearchResult {
  next: null | string;
  prev: null | string;
  resultIds: string[];
  total: number;
}

export interface Location {
  city: string;
  county: string;
  latitude: number;
  longitude: number;
  state: string;
  zip_code: string;
}

export type LoginFormState =
  | undefined
  | {
      errors?: {
        email?: string[];
        name?: string[];
      };
      message?: string;
    };

export interface Match {
  match: string;
}

export interface MatchFormState {
  dog?: Dog;
  errorMessage?: string;
}

export interface SearchBreedFormState {
  dogs?: Dog[];
  errors?: {
    breeds?: string[];
  };
  next?: null | string;
  prev?: null | string;
  sortDirection?: "asc" | "desc";
  total?: number;
}
