import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatTime(elapsed_ms: number) {
    const min = Math.floor(elapsed_ms / 60);
    const seconds = Math.floor(elapsed_ms - min * 60);

    const format = min.toString().padStart(1, "0") + ":" + seconds.toString().padStart(2, "0");

    return format;
}
