import express, { NextFunction, Request, Response } from "express";

import { createHospital, readHospitals } from "./hospitals.js";

const hospitalsRoutes = express.Router();

hospitalsRoutes.get(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const hospitals = await readHospitals();

      response.json(hospitals);
    } catch (error) {
      next(error);

      return;
    }
  },
);

hospitalsRoutes.post(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const {
        body: { name },
      } = request;

      const hospital = await createHospital({ name });

      response.json(hospital);
    } catch (error) {
      next(error);

      return;
    }
  },
);

export { hospitalsRoutes };
