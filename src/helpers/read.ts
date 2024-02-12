import { readFile } from "node:fs/promises";

// const __dirname = dirname(fileURLToPath(import.meta.url));
const filename = "./src/data.json";

export const getData = async () => {
  try {
    const data = await readFile(filename, { encoding: "utf8" });
    return JSON.parse(data) || {};
  } catch (e) {
    throw new Error("Can't read file");
  }
};
