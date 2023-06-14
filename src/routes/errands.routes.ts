import { Router } from "express";
import { ErrandsController } from "../controllers/errands.controller";
import { errandCheck } from "../middlewares/errand.middleware";

export const errandsRoutes = () => {
  const app = Router({
    mergeParams: true,
  });

  app.post("/", [errandCheck], new ErrandsController().create);
  app.get("/:errandid", new ErrandsController().get);
  app.get("/", new ErrandsController().list);
  app.delete("/:errandid", new ErrandsController().delete);
  app.put("/:errandid", new ErrandsController().update);
  return app;
};
