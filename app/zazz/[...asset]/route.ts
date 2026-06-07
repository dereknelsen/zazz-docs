import { getZazzScript, getZazzStylesheet } from "@/lib/zazz-assets";

export const runtime = "nodejs";

/**
 * Serves the centralized Zazz module's compiled assets to the preview iframes:
 *   GET /zazz/styles.css        → the full Zazz stylesheet (all layers, in order)
 *   GET /zazz/scripts/<name>.js → a runtime script (e.g. embla, reveal, utils)
 *
 * Iframes load these by URL so Zazz CSS never enters the docs DOM.
 */
export async function GET(_request: Request, { params }: { params: Promise<{ asset: string[] }> }) {
  const { asset } = await params;
  const segments = asset ?? [];
  const route = segments.join("/");

  if (route === "styles.css") {
    return new Response(getZazzStylesheet(), {
      headers: {
        "content-type": "text/css; charset=utf-8",
        "cache-control": "public, max-age=0, must-revalidate",
      },
    });
  }

  if (segments.length === 2 && segments[0] === "scripts") {
    const script = getZazzScript(segments[1]);
    if (script != null) {
      return new Response(script, {
        headers: {
          "content-type": "text/javascript; charset=utf-8",
          "cache-control": "public, max-age=0, must-revalidate",
        },
      });
    }
  }

  return new Response("Not found", { status: 404 });
}
