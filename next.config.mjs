import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // The /zazz/[...path] route reads framework files from disk at runtime. Next's file
  // tracing can't infer those dynamic reads, so include the source explicitly or the
  // assets 404 in a production build.
  outputFileTracingIncludes: {
    "/zazz/[...path]": ["./zazz/**/*"],
  },
};

export default withMDX(config);
