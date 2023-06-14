import { Router } from "express";
import { errandsRoutes } from "../routes/errands.routes";

export const userRoutes = () => {
  const app = Router();

  app.post("/", [userCheck, cpfCheck], new UserController().create);
  app.get("/:id", new UserController().get);
  app.get("/", new UserController().list);
  app.delete("/:id", new UserController().delete);
  app.put("/:id", new UserController().update);

  app.use("/:userid/errands", errandsRoutes());

  return app;
};
