import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function gabungKelas(...daftarInput) {
  return twMerge(clsx(daftarInput));
}
