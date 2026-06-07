"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { buildPreviewDocument } from "@/lib/zazz-iframe";

interface PreviewFrameProps {
  html: string;
  scripts?: string[];
  align?: "start" | "center";
  minHeight?: number;
  title?: string;
}

/**
 * Renders a Zazz example inside an isolated, same-origin iframe. The iframe is
 * the only place Zazz CSS loads on the docs site, so its reset/utilities stay
 * fully sandboxed from Tailwind + fumadocs. We sync two things across the
 * boundary: the iframe's height (to its content) and the site's light/dark mode.
 */
export function PreviewFrame({
  html,
  scripts,
  align = "start",
  minHeight = 0,
  title = "Preview",
}: PreviewFrameProps) {
  const ref = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(minHeight || 160);

  const srcDoc = useMemo(
    () => buildPreviewDocument({ html, scripts, align }),
    [html, scripts, align],
  );

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

  return (
    <iframe
      ref={ref}
      title={title}
      srcDoc={srcDoc}
      loading="lazy"
      sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals"
      className="block w-full"
      style={{ height, colorScheme: "normal" }}
    />
  );
}
