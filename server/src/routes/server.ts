import express from "express";
import logger from "../logger";
import "dotenv/config";

const app = express();

function listen(port: string) {
  app.listen(port);
  logger.info(`Server listening on port ${port}`);
  logger.info(`Setting up middleware`);
  app.use(express.json());
  logger.info(`Middleware Setup Complete`);
}

export { listen as Listen, app as App };
