import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const graphQLAPI = 'https://swr-graphql-books-api.trillionz.repl.co';
export const restAPI = 'http://localhost:5000';
