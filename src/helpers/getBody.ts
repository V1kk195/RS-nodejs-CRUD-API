import http from "http";

export const getReqBody = (req: http.IncomingMessage): Promise<any> => {
  let result = "";

  return new Promise((resolve, reject) => {
    req.on("data", (chunk) => {
      result += chunk;
    });

    req.on("end", () => {
      try {
        result = result ? JSON.parse(result) : {};

        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  });
};
