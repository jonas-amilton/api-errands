import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { userCheck } from "../../../shared/middlewares/index";
import { errandRoutes } from "../../errand/routes/errand.routes";

export const userRoutes = () => {
  const app = Router();

  //todo alterar validações
  app.post("/", [userCheck], new UserController().create);
  app.get("/:id", new UserController().get);
  app.get("/", new UserController().list);
  app.delete("/:id", new UserController().delete);
  app.put("/:id", new UserController().update);

  app.use("/:userId/errands", errandRoutes());

  return app;
};
