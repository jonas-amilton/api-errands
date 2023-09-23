import { Router } from "express";
import { ErrandController } from "../controllers/errand.controller";
import { errandCheck } from "../../../shared/middlewares/index";

export const errandRoutes = () => {
  const app = Router({ mergeParams: true });

  app.post("/", [errandCheck], new ErrandController().create);
  app.get("/:errandId", new ErrandController().getById);
  app.get("/", new ErrandController().list);
  app.delete("/:errandId", new ErrandController().delete);
  app.put("/:errandId", new ErrandController().update);

  return app;
};
