import { redirect } from "next/navigation";
import { listExamples, readExample } from "@/lib/zazz-assets";
import { getExampleMeta } from "zazz/examples/manifest";
import { PreviewFrame } from "@/components/preview-frame";

const isProduction = process.env.NODE_ENV === "production";

/**
 * Dev-only gallery that renders every zazz/examples/* demo in its own isolated
 * iframe — the same source and isolation the docs previews use. A quick visual
 * smoke test that all primitives still render under the current Zazz CSS.
 */
export default function DebugPage() {
  if (isProduction) redirect("/docs");

  const examples = listExamples();

  return (
    <main style={{ maxWidth: "60rem", margin: "0 auto", padding: "2rem 1.5rem" }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "0.5rem" }}>
        Zazz examples
      </h1>
      <p style={{ color: "#666", marginBottom: "2rem" }}>
        {examples.length} demos, each in an isolated iframe loading only{" "}
        <code>/zazz/styles.css</code>.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {examples.map((src) => {
          const html = readExample(src);
          if (html == null) return null;
          const meta = getExampleMeta(src);
          return (
            <section key={src}>
              <h2 style={{ fontFamily: "monospace", fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                {src}
              </h2>
              <div style={{ border: "1px solid #e5e5e5", borderRadius: "0.5rem", overflow: "hidden" }}>
                <PreviewFrame
                  html={html}
                  scripts={meta?.requiresScripts}
                  align={meta?.align ?? "start"}
                  minHeight={meta?.minHeight}
                  title={src}
                />
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
