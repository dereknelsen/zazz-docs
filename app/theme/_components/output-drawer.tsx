"use client";

import { ChevronDown, ChevronUp, Copy, Check, Download } from "lucide-react";
import { useState } from "react";
import { cn } from "../../../lib/cn";
import { generateThemeCSS } from "../_lib/generate-css";
import { useTheme } from "../_state/theme-store";

export function OutputDrawer() {
  const { theme, reset } = useTheme();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const css = generateThemeCSS(theme);

  const copy = async () => {
    await navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const download = () => {
    const blob = new Blob([css], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "variables.css";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className={cn(
        "border-t border-fd-border/40 bg-fd-card/40 backdrop-blur transition-[max-height] duration-300",
        open ? "max-h-[60vh]" : "max-h-[44px]",
      )}
    >
      <header className="flex items-center justify-between gap-2 px-4 py-2">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium text-fd-foreground hover:bg-fd-accent"
        >
          {open ? <ChevronDown className="size-3.5" /> : <ChevronUp className="size-3.5" />}
          Generated CSS
        </button>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={reset}
            className="rounded-md px-2 py-1 text-xs text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-foreground"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={download}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-foreground"
          >
            <Download className="size-3.5" />
            Download
          </button>
          <button
            type="button"
            onClick={copy}
            className="inline-flex items-center gap-1 rounded-md bg-fd-primary px-2.5 py-1 text-xs font-medium text-fd-primary-foreground hover:bg-fd-primary/90"
          >
            {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            {copied ? "Copied" : "Copy CSS"}
          </button>
        </div>
      </header>
      {open && (
        <pre className="m-0 max-h-[calc(60vh-44px)] overflow-auto px-4 pb-4 font-mono text-[11px] leading-relaxed text-fd-foreground">
          <code>{css}</code>
        </pre>
      )}
    </div>
  );
}
