import "server-only";
import fs from "node:fs";
import path from "node:path";

const examplesDir = path.join(process.cwd(), "components/preview-examples");

export function readPreviewSource(name: string): string {
  const filePath = path.join(examplesDir, `${name}.tsx`);
  return fs.readFileSync(filePath, "utf8");
}
