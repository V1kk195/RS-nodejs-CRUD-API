import http from "http";
import { getUsers } from "./users/users.controller";

export const getRoutes = async (
  req: http.IncomingMessage,
  res: http.ServerResponse,
) => {
  const url = req.url?.split("/");
  const route = `/${url?.[1]}/${url?.[2]}`;

  switch (route) {
    case "/api/users":
      await getUsers(req, res);
      break;
    default:
      res.statusCode = 404;
      res.write(`Endpoint ${req.url} doesn't exist`);
      res.end();
  }
};
