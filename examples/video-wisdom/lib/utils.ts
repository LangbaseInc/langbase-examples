export { cn } from "mxcn";

// Check if a key is in localStorage
export function isKeyInLocalStorage(key: string): boolean {
  return localStorage.getItem(key) !== null && localStorage.getItem(key) !== "";
}

// Store a key in localStorage
export function setKeyInLocalStorage(key: string, value: string) {
  localStorage.setItem(key, value);
  // Check if the value is set and not null, if null, or "" then remove the key
  if (!isKeyInLocalStorage(key)) {
    localStorage.removeItem(key);
  }
}

// Get a key from localStorage
export function getKeyFromLocalStorage(key: string): string | null {
  return localStorage.getItem(key);
}
