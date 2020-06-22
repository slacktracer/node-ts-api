import fs from "fs-extra";
import mongoose from "mongoose";

import { url } from "./databaseURL.js";

export const openDatabaseConnection = async () => {
  // const ca = [await fs.readFile("rds-combined-ca-bundle.pem")];

  mongoose.connect(url.toString(), {
    dbName: "twiage",
    // sslCA: ca,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const connection = mongoose.connection;

  connection.on("error", (error) =>
    console.error(`Connection error: ${error}`),
  );

  await new Promise((resolve) => {
    connection.once("open", resolve);
  });

  console.log(`Connected to ${url.protocol}//${url.hostname}:${url.port}`);

  return connection;
};
