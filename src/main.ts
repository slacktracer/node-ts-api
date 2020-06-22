import { startApplication } from "./application.js";
import { startGraphQL } from "./graphql.js";
import { openDatabaseConnection } from "./database/connection.js";
import { hospitalsRoutes } from "./modules/hospitals/hospitals.routes.js";

(async () => {
  const application = await startApplication();
  const connection = await openDatabaseConnection();

  await startGraphQL({ application, connection });

  application.use("/hospitals", hospitalsRoutes);

  application.use("/", (request, response) => response.json({ healthy: true }));
})();
