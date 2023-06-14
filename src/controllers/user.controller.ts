import { Request, Response } from "express";
import { User } from "../models/user";
import { usersDb } from "../database/users";
import { ApiResponse } from "../util/http-response.adapter";

export class UserController {
  public create(req: Request, res: Response) {
    try {
      const { name, password, email } = req.body;

      const user = new User(name, email, password);

      usersDb.push(user);

      return ApiResponse.success(res, "Usuario Criado", user);
    } catch (error: any) {
      return ApiResponse.serverError(res, error);
    }
  }

  public get(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const userFind = usersDb.find((u) => u.id === id);

      if (!userFind) {
        return ApiResponse.notFound(res, "Usuario");
      }

      return ApiResponse.success(
        res,
        "Usuario filtrado por id com sucesso!",
        userFind.toJson()
      );
    } catch (error: any) {
      return ApiResponse.serverError(res, error);
    }
  }
}
