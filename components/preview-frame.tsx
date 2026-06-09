"use client";

import { cn } from "@/lib/cn";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { buildPreviewDocument } from "@/lib/zazz-iframe";
import type { ExampleScript } from "zazz/components/manifest";
import { buttonVariants } from "./ui/button";
import { ExpandIcon, XIcon } from "lucide-react";

interface PreviewFrameProps {
  html: string;
  scripts?: ExampleScript[];
  /** Vertical placement of the demo. */
  justify?: "start" | "center" | "end";
  /** Horizontal placement of the demo. */
  align?: "start" | "center" | "end";
  minHeight?: number;
  title?: string;
  styleHrefs?: string[];
}

/**
 * Renders a Zazz example inside an isolated, same-origin iframe. The iframe is the only
 * place Zazz CSS loads on the docs site, so its reset/utilities stay fully sandboxed from
 * Tailwind + fumadocs. We sync two things across the boundary: the iframe's height (to its
 * content, floored at `minHeight`) and the site's light/dark mode.
 */
export function PreviewFrame({
  html,
  scripts,
  justify = "center",
  align = "center",
  minHeight = 0,
  title = "Preview",
  styleHrefs,
}: PreviewFrameProps) {
  const ref = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(minHeight || 260);
  const [fullscreen, setFullscreen] = useState(false);

  const toggleFullscreen = useCallback(() => setFullscreen((v) => !v), []);

  const srcDoc = useMemo(
    () => buildPreviewDocument({ html, scripts, justify, align, minHeight, styleHrefs }),
    [html, scripts, justify, align, minHeight, styleHrefs],
  );

  useEffect(() => {
    if (!fullscreen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFullscreen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [fullscreen]);

  useEffect(() => {
    const iframe = ref.current;
    if (!iframe) return;

    let resizeObserver: ResizeObserver | undefined;

    const measure = () => {
      const doc = iframe.contentDocument;
      if (!doc) return;
      const measured = Math.ceil(doc.documentElement.scrollHeight);
      setHeight(Math.max(measured, minHeight));
    };

    const syncTheme = () => {
      const doc = iframe.contentDocument;
      if (!doc) return;
      const dark = document.documentElement.classList.contains("dark");
      doc.documentElement.classList.toggle("dark", dark);
    };

    const onLoad = () => {
      const doc = iframe.contentDocument;
      if (!doc) return;
      syncTheme();
      measure();
      resizeObserver = new ResizeObserver(measure);
      resizeObserver.observe(doc.documentElement);
      // Fonts load async (Geist via web font) and reflow the content.
      doc.fonts?.ready.then(measure).catch(() => {});
    };

    iframe.addEventListener("load", onLoad);
    // Mirror site theme changes (next-themes toggles `.dark` on <html>).
    const themeObserver = new MutationObserver(syncTheme);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    // If the srcDoc already finished loading before listeners attached.
    if (iframe.contentDocument?.readyState === "complete") onLoad();

    return () => {
      iframe.removeEventListener("load", onLoad);
      resizeObserver?.disconnect();
      themeObserver.disconnect();
    };
  }, [srcDoc, minHeight]);

  const iframeEl = (
    <iframe
      ref={ref}
      title={title}
      srcDoc={srcDoc}
      loading="eager"
      sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals"
      className="block w-full"
      style={{ height: fullscreen ? "100%" : height, colorScheme: "normal" }}
    />
  );

  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col bg-fd-background">
        <button
          type="button"
          onClick={toggleFullscreen}
          className={cn(buttonVariants({ variant: "outline", size: "sm" }), "absolute right-4 top-4 z-10 px-2 py-1 bg-fd-background shadow-xs")}
          aria-label="Close fullscreen preview"
        >
          <XIcon className="size-3.5 " />
          Close
        </button>
        <div className="flex-1 overflow-auto">{iframeEl}</div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute right-2 bottom-2 z-10">
        <button
          className={cn(buttonVariants({ variant: "outline", size: "sm" }), "px-2 py-1 bg-fd-background shadow-xs")}
          onClick={toggleFullscreen}
          aria-label="Expand preview fullscreen"
        >
          <ExpandIcon className="size-3.5 mr-1" />
          Expand
        </button>
      </div>
      {iframeEl}
    </div>
  );
}
