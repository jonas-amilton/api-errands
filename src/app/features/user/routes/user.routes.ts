import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { userCheck } from "../../../shared/middlewares/index";
import { errandRoutes } from "../../errand/routes/errand.routes";

export const userRoutes = () => {
  const app = Router();

  //todo: todas as rotas foram testadas no postman e funcionam com sucesso
  app.post("/", [userCheck], new UserController().create);
  app.get("/:userId", new UserController().getById);
  app.delete("/:userId", new UserController().delete);
  app.put("/:userId", new UserController().update);

  app.use("/:userId/errands", errandRoutes());

  return app;
};
