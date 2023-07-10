import logger from "../logger";
import * as Server from "./server";
import * as User from "./user-router";

function Init() {
  logger.info("Initializing server...");

  Server.App.get("/user/create/:id", User.registerUser);
}

export default Init;
