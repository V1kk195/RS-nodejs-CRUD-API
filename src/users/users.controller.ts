import { getData } from "../helpers/read";
import http from "http";
import { Data, User } from "../types";
import { validate } from "uuid";
import { writeData } from "../helpers/writeData";
import { getReqBody } from "../helpers/getBody";

export const getUsers = async (
  req: http.IncomingMessage,
  res: http.ServerResponse,
) => {
  const url = req.url?.split("/");
  const param = url?.[3];

  if (req.method === "GET" && !param) {
    const data = await getData();
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(data.users));
    res.end();
    return;
  }

  if (req.method === "GET" && param) {
    if (!validate(param)) {
      res.statusCode = 400;
      res.write(`UserID ${param} is invalid`);
      res.end();
      return;
    }

    const data: Data = await getData();
    const user = data.users.find((user) => user.id === param);

    if (user) {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify(user));
      res.end();
      return;
    }

    if (!user) {
      res.statusCode = 404;
      res.write(`Couldn't find user ${param}`);
      res.end();
      return;
    }
  }

  if (req.method === "POST") {
    const body = (await getReqBody(req)) as User;

    if (!body?.username || !body?.age) {
      res.statusCode = 400;
      res.write(`User entry doesn't have username or age`);
      res.end();
      return;
    }

    try {
      await writeData(body);

      const data = await getData();
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify(data.users));
      res.end();
      return;
    } catch (e) {
      console.log(e);
      res.statusCode = 400;
      res.write(`Couldn't create user`);
      res.end();
      return;
    }
  }
};
