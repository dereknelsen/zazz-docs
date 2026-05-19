import type { ReactNode } from "react";

export default function ThemeLayout({ children }: { children: ReactNode }) {
  return <div className="theme-builder">{children}</div>;
}
