"use client";

import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  document.addEventListener("visibilitychange", callback);
  return () => {
    query.removeEventListener("change", callback);
    document.removeEventListener("visibilitychange", callback);
  };
}

export function useMotionPreference() {
  return useSyncExternalStore(
    subscribe,
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches && !document.hidden,
    () => false,
  );
}
