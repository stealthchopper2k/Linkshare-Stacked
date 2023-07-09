import logger from "../logger";
import * as Server from "./server";
import * as User from "./user-router";

function Init() {
  logger.info("Initializing server...");

  Server.App.get("/api/createUser/:id", User.postUser);
}

export default Init;
