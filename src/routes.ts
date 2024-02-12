import http from "http";
import { getUsers } from "./users/users.controller";

export const getRoutes = async (
  req: http.IncomingMessage,
  res: http.ServerResponse,
) => {
  switch (req.url) {
    case "/api/users":
      await getUsers(req, res);
      break;
    default:
      res.statusCode = 404;
      res.write(`${req.url} doesn't exist`);
      res.end();
  }
};
