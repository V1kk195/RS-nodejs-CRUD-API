import { getData } from "../helpers/read";
import * as http from "http";

export const getUsers = async (
  req: http.IncomingMessage,
  res: http.ServerResponse,
) => {
  if (req.method === "GET") {
    const users = await getData();
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(users));
    res.end();
  } else {
    res.statusCode = 400;
    res.write(`Couldn't get ${req.url}`);
    res.end();
  }
};
