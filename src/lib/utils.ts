import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitial = (value: string | undefined) => {
  return value?.slice(0, 2).toUpperCase();
};
