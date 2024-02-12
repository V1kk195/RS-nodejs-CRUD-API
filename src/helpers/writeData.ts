import { writeFile } from "node:fs/promises";
import { getData } from "./read";
import { User } from "../types";
import { v4 } from "uuid";

export const writeData = async (data: User) => {
  const filename = "./src/data.json";
  const file = await getData();
  file.users.push({ ...data, id: v4() });

  try {
    await writeFile(filename, JSON.stringify(file), { flag: "w" });
  } catch (e) {
    throw new Error(e as string);
  }
};
