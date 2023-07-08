import * as Database from "./routes/database";
import * as Server from "./routes/server";
import "dotenv/config";

async function main() {
  await Database.ConnectToDatabase();
  Server.Listen(process.env.PORT as string);
}

main();
