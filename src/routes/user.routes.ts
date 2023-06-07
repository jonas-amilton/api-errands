import { Router } from "express";
import { errandsRoutes } from "../routes/errands.routes";

export const userRoutes = () => {
  const app = Router();

  app.use("/:userid/errands", errandsRoutes());

  return app;
};
