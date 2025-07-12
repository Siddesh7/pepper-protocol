import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const centerMaskWalletAddress = (address: string, length?: number) => {
  if (address) {
    const start = address.substring(0, length ?? 7);
    const end = address.substring(address.length - (length ?? 7));
    return start + "..." + end;
  }
  return "";
};