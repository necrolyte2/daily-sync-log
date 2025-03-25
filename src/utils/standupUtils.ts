
import { Standup } from "../types";

// Generate a unique ID for new standups
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Get standups from local storage
export const getStandups = (): Standup[] => {
  const standupsString = localStorage.getItem("standups");
  if (!standupsString) return [];

  try {
    return JSON.parse(standupsString);
  } catch (error) {
    console.error("Error parsing standups from localStorage:", error);
    return [];
  }
};

// Save standups to local storage
export const saveStandups = (standups: Standup[]): void => {
  localStorage.setItem("standups", JSON.stringify(standups));
};

// Get formatted date for today
export const getTodayDate = (): string => {
  return new Date().toISOString().split("T")[0];
};

// Format a date string (YYYY-MM-DD) to a more readable format
export const formatDate = (dateString: string, options?: Intl.DateTimeFormatOptions): string => {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  
  const mergedOptions = options || defaultOptions;
  
  return new Date(dateString).toLocaleDateString(undefined, mergedOptions);
};
