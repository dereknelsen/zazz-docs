import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import { previewRegistry } from "@/lib/preview-registry";
import { readPreviewSource } from "@/lib/preview-source";
import { cn } from "@/lib/cn";
import { Tab, Tabs } from "./tabs";

interface ComponentPreviewProps {
  name: string;
  align?: "start" | "center" | "end";
  className?: string;
  paddingClass?: string;
}

export function ComponentPreview({
  name,
  align = "center",
  className,
  paddingClass = "p-8",
}: ComponentPreviewProps) {
  const Component = previewRegistry[name];
  if (!Component) {
    return (
      <div className="not-prose rounded-md border border-fd-destructive/40 bg-fd-destructive/5 p-4 text-sm text-fd-destructive">
        Preview <code>{name}</code> not found in <code>lib/preview-registry.tsx</code>.
      </div>
    );
  }

  const source = readPreviewSource(name);
  const alignClass =
    align === "start"
      ? "items-start justify-start"
      : align === "end"
        ? "items-end justify-end"
        : "items-center justify-center";

  return (
    <Tabs items={["Preview", "Code"]} className={cn("not-prose my-6", className)}>
      <Tab value="Preview">
        <div
          className={cn(
            "zazz-preview relative flex min-h-[360px] w-full overflow-hidden rounded-md border bg-fd-card",
            alignClass,
            paddingClass,
          )}
        >
          <Component />
        </div>
      </Tab>
      <Tab value="Code">
        <DynamicCodeBlock lang="tsx" code={source.trimEnd()} />
      </Tab>
    </Tabs>
  );
}
