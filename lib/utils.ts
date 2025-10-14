import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { techDescriptionMap, techMap } from "@/constants/techmap";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTechDescription = (techName: string): string => {
  if (!techName) return "Unknown technology.";

  const normalizedTechName = techName.replace(/[ .]/g, "").toLowerCase();

  return (
    techDescriptionMap[normalizedTechName] ||
    `${techName} is a technology or tool widely used in web development, providing valuable features and capabilities.`
  );
};

export const getDeviconClassName = (techName: string) => {
  if (!techName) return "devicon-devicon-plain";

  const normalizedTechName = techName.replace(/[ .]/g, "").toLowerCase();

  return techMap[normalizedTechName]
    ? `${techMap[normalizedTechName]} colored`
    : "devicon-devicon-plain";
};

export const getTimestamp = (createdAt: Date): string => {
  const date = new Date(createdAt);
  const inputTimeMs = new Date(date).getTime();
  const nowMs = Date.now();

  if (Number.isNaN(inputTimeMs)) return "Invalid date";

  const diffSeconds = Math.floor((nowMs - inputTimeMs) / 1000);

  if (diffSeconds <= 0) return "just now";

  const minutes = Math.floor(diffSeconds / 60);
  const hours = Math.floor(diffSeconds / 3600);
  const days = Math.floor(diffSeconds / 86400);
  const months = Math.floor(diffSeconds / 2592000); // approx 30 days
  const years = Math.floor(diffSeconds / 31536000); // 365 days

  const format = (value: number, unit: string) =>
    `${value} ${unit}${value === 1 ? "" : "s"} ago`;

  if (diffSeconds < 60) return format(diffSeconds, "second");
  if (minutes < 60) return format(minutes, "minute");
  if (hours < 24) return format(hours, "hour");
  if (days < 30) return format(days, "day");
  if (months < 12) return format(months, "month");
  return format(years, "year");
};
