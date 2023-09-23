import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { userCheck } from "../../../shared/middlewares/index";
import { errandRoutes } from "../../errand/routes/errand.routes";

export const userRoutes = () => {
  const app = Router();

  //todo: todas as rotas foram testadas no postman e funcionam com sucesso
  app.post("/", [userCheck], new UserController().create);
  app.get("/:id", new UserController().getById);
  app.delete("/:id", new UserController().delete);
  app.put("/:id", new UserController().update);

  app.use("/:userId/errands", errandRoutes());

  return app;
};
