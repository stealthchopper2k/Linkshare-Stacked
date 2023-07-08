import { connect, Connection } from "mongoose";
import { mongoLog } from "../logger";
import "dotenv/config";
import logger from "../logger";

const database: string = process.env.MONGODB_URI as string;

let established: Connection | null = null;

async function ConnectToDatabase() {
  if (established) {
    logger.error("Database already connected.");
    return;
  }

  logger.info("Connecting to the database...");
  const db = await connect(database).catch((err) => {
    logger.error("Could not connect to the database:", err);
    process.exit(1);
  });

  logger.info("Connected to the database:", db);
}

export { ConnectToDatabase };
