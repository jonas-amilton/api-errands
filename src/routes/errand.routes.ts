import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { userCheck } from "../middlewares/user.middleware";
import { ErrandController } from "../controllers/errand.controller";
import { errandCheck } from "../middlewares/errand.middleware";

export const errandRoutes = () => {
  const app = Router({ mergeParams: true });

  app.post("/", [errandCheck], new ErrandController().create);
  app.get("/:errandId", new ErrandController().get);
  app.get("/", new ErrandController().list);
  app.delete("/:errandId", new ErrandController().delete);
  app.put("/:errandId", new ErrandController().update);

  return app;
};
