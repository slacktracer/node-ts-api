import cors from "cors";
import express from "express";
import helmet from "helmet";

if (!process.env.API_PORT) {
  console.error("NO_PORT");
  process.exit(1);
}

const port = Number(process.env.API_PORT);

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.listen(port, (error) => {
  if (error) {
    console.error(error);

    return;
  }

  console.log(`Listening on port ${port}`);
});

export default app;
