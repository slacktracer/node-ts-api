import "./database/database.js";

import app from "./app.js";
import { hospitalsRoutes } from "./modules/hospitals/hospitals.routes.js";

app.use("/hospitals", hospitalsRoutes);
