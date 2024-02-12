import { createServer } from "http";
import { getRoutes } from "./routes";
const PORT = process.env.PORT || 4000;

const server = createServer(getRoutes);

server.on("error", (err) => {
  console.log(err);
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

//GET api/users is used to get all persons
// Server should answer with status code 200 and all users records
