import { readFile } from "fs/promises";
import path from "path";

const docsDirectory = path.join(process.cwd(), "docs");

export async function getLegalDocument(fileName: string) {
  const filePath = path.join(docsDirectory, fileName);
  return readFile(filePath, "utf8");
}
