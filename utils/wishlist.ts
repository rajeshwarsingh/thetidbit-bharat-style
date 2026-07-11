/**
 * Lightweight wishlist stored in localStorage.
 * Keyed by catalog item key (`${productId}:${colorId}`). SSR-safe (no-ops on server).
 * Components subscribe via the `useWishlist` hook (see hook below) or subscribe().
 */
import { useSyncExternalStore } from 'react';

const STORAGE_KEY = 'tidbit_wishlist';
const EVENT = 'tidbit:wishlist';

function isBrowser() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function read(): string[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function write(keys: string[]) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(keys));
    window.dispatchEvent(new Event(EVENT));
  } catch {
    /* ignore quota / privacy-mode errors */
  }
}

export function getWishlist(): string[] {
  return read();
}

export function isWished(key: string): boolean {
  return read().includes(key);
}

export function toggleWishlist(key: string): boolean {
  const current = read();
  const exists = current.includes(key);
  const next = exists ? current.filter((k) => k !== key) : [...current, key];
  write(next);
  return !exists;
}

export function subscribe(callback: () => void): () => void {
  if (!isBrowser()) return () => {};
  window.addEventListener(EVENT, callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener('storage', callback);
  };
}

const EMPTY: string[] = [];

// Cached snapshot so getSnapshot returns a STABLE reference between changes.
// useSyncExternalStore throws an infinite-loop warning if getSnapshot returns
// a new array every call, so we only produce a new array when the raw string
// in localStorage actually changes.
let cachedRaw: string | null = null;
let cachedList: string[] = EMPTY;

function readSnapshot(): string[] {
  if (!isBrowser()) return EMPTY;
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    raw = null;
  }
  if (raw === cachedRaw) return cachedList;
  cachedRaw = raw;
  try {
    cachedList = raw ? (JSON.parse(raw) as string[]) : EMPTY;
  } catch {
    cachedList = EMPTY;
  }
  return cachedList;
}

/** React hook: returns the full wishlist and re-renders on change. */
export function useWishlist(): string[] {
  return useSyncExternalStore(subscribe, readSnapshot, () => EMPTY);
}

/** React hook for a single item's wished state. */
export function useIsWished(key: string): boolean {
  const list = useWishlist();
  return list.includes(key);
}
