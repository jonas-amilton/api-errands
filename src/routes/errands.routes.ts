import { Router } from "express";
import { ErrandsController } from "../controllers/errands.controller";

export const errandsRoutes = () => {
  const app = Router({
    mergeParams: true,
  });

  app.post("/", new ErrandsController().create);
  // app.get("/:errandid", new ErrandsController().get);
  // app.get("/", new ErrandsController().list);
  // app.delete("/:errandid", new ErrandsController().delete);
  // app.put("/:errandid", new ErrandsController().update);
  return app;
};
