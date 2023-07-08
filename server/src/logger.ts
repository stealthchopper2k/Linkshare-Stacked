import { Mongoose } from "mongoose";
import { createLogger, format, transports } from "winston";
import "winston-mongodb";
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

// console.logger
const logger = createLogger({
  format: combine(label({ label: "right meow!" }), timestamp(), myFormat),
  transports: [
    new transports.File({ filename: "error.log", level: "error" }),
    new transports.File({ filename: "combined.log" }),
  ],
});

export const mongoLog = (mongoInstance: Mongoose) => {
  mongoInstance.set(
    "debug",
    (collectionName: any, method: any, query: any, doc: any) => {
      logger.info(`${collectionName}.${method}`, JSON.stringify(query), doc);
    }
  );
};

export default logger;
