import fs from "fs";
import mongoose from "mongoose";

import { url } from "./databaseURL.js";

const ca = [fs.readFileSync("rds-combined-ca-bundle.pem")];

mongoose.connect(url.toString(), {
  dbName: "proto",
  sslCA: ca,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => console.error(`Connection error: ${error}`));

db.once("open", () =>
  console.log(`Connected to ${url.protocol}//${url.hostname}:${url.port}`),
);
