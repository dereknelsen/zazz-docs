import { readExample } from "@/lib/zazz-assets";
import { getExampleMeta } from "zazz/components/manifest";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import { cn } from "@/lib/cn";
import { Tab, Tabs } from "./tabs";
import { PreviewFrame } from "./preview-frame";

interface PreviewProps {
  /** Example id like `button/variants` — reads zazz/components/button/variants.html. */
  src: string;
  align?: "start" | "center";
  className?: string;
}

/**
 * The single MDX entry point for a live primitive demo. Reads one vanilla-HTML
 * example from the centralized `zazz/components/` source and renders it two ways
 * from that one string: a live, isolated iframe preview and the exact code
 * block. No second copy can drift.
 */
export function Preview({ src, align, className }: PreviewProps) {
  const html = readExample(src);

  if (html == null) {
    return (
      <div className="not-prose rounded-md border border-fd-destructive/40 bg-fd-destructive/5 p-4 text-sm text-fd-destructive">
        Example <code>{src}</code> not found in <code>zazz/components</code>.
      </div>
    );
  }

  const meta = getExampleMeta(src);

  return (
    <Tabs items={["Preview", "Code"]} className={cn("not-prose my-6", className)}>
      <Tab value="Preview">
        <div className="overflow-hidden rounded-md border bg-fd-background">
          <PreviewFrame
            html={html}
            scripts={meta?.requiresScripts}
            align={align ?? meta?.align ?? "start"}
            minHeight={meta?.minHeight}
            title={meta?.title ?? src}
          />
        </div>
      </Tab>
      <Tab value="Code">
        <DynamicCodeBlock lang="html" code={html} />
      </Tab>
    </Tabs>
  );
}
