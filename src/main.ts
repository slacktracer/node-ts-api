import { startApplication } from "./application.js";
import { startGraphQL } from "./graphql.js";
import { openDatabaseConnection } from "./database/connection.js";
import { hospitalsRoutes } from "./modules/hospitals/hospitals.routes.js";

(async () => {
  const application = await startApplication();
  const connection = await openDatabaseConnection();

  await startGraphQL({ application, connection });

  const healthCheckEndpoint = process.env.API_HEALTH_CHECK_ENDPOINT;

  application.use(healthCheckEndpoint, (request, response) => {
    const state = { connected: connection.readyState > 0 };

    response.json(state);
  });

  application.use("/hospitals", hospitalsRoutes);
})();
