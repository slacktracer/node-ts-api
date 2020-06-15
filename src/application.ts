import cors from "cors";
import express from "express";
import helmet from "helmet";

if (!process.env.API_PORT) {
  console.error("NO_PORT");

  process.exit(1);
}

export const startApplication = async () => {
  const healthCheckEndpoint = process.env.API_HEALTH_CHECK_ENDPOINT;
  const port = Number(process.env.API_PORT);

  const application = express();

  application.use(helmet());
  application.use(cors());
  application.use(express.json());

  try {
    await new Promise((resolve) => {
      application.listen(port, resolve);
    });

    console.log(`Server listening on port ${port}`);
    console.log(`Health checks available at ${healthCheckEndpoint}`);

    return application;
  } catch (error) {
    console.error(error);
  }
};
