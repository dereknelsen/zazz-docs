"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { DEFAULT_THEME } from "../_lib/defaults";
import { decodeTheme, hydrateTheme, persistTheme } from "../_lib/theme-hash";
import type { ThemeConfig } from "../_lib/types";

type Action =
  | { type: "set"; updater: (prev: ThemeConfig) => ThemeConfig }
  | { type: "reset" }
  | { type: "hydrate"; theme: ThemeConfig };

function reducer(state: ThemeConfig, action: Action): ThemeConfig {
  switch (action.type) {
    case "set":
      return action.updater(state);
    case "reset":
      return DEFAULT_THEME;
    case "hydrate":
      return action.theme;
  }
}

interface Ctx {
  theme: ThemeConfig;
  hydrated: boolean;
  update: (updater: (prev: ThemeConfig) => ThemeConfig) => void;
  reset: () => void;
}

const ThemeCtx = createContext<Ctx | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, dispatch] = useReducer(reducer, DEFAULT_THEME);
  const [hydrated, setHydrated] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Hydrate after mount (client-only)
  useEffect(() => {
    dispatch({ type: "hydrate", theme: hydrateTheme() });
    setHydrated(true);

    const onHash = () => {
      const next = decodeTheme(window.location.hash);
      if (next) dispatch({ type: "hydrate", theme: next });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // Persist (debounced)
  useEffect(() => {
    if (!hydrated) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => persistTheme(theme), 250);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [theme, hydrated]);

  const update = useCallback((updater: (prev: ThemeConfig) => ThemeConfig) => {
    dispatch({ type: "set", updater });
  }, []);
  const reset = useCallback(() => dispatch({ type: "reset" }), []);

  const value = useMemo(() => ({ theme, hydrated, update, reset }), [theme, hydrated, update, reset]);
  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme must be inside <ThemeProvider>");
  return ctx;
}
