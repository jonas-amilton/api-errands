import { Request, Response } from "express";
import { usersDb } from "../database/users";
import { ApiResponse } from "../util/http-response.adapter";
import { Errands, TypeErrands } from "../models/errands";

export class ErrandsController {
  public create(req: Request, res: Response) {
    try {
      const { title, description, type } = req.body;
      const { userid } = req.params;

      const userFind = usersDb.find((u) => u.id === userid);

      if (!userFind) {
        return ApiResponse.notFound(res, "User");
      }

      const errand = new Errands(title, description, type);
      userFind.errands.push(errand);

      return ApiResponse.success(res, "Usuario encontrado", userFind);
    } catch (error: any) {
      return ApiResponse.serverError(res, error);
    }
  }

  public get(req: Request, res: Response) {
    try {
      const { userid, errandid } = req.params;

      const userFind = usersDb.find((u) => u.id === userid);

      if (!userFind) {
        return ApiResponse.notFound(res, "Usuario");
      }

      const findErrandUserId = userFind.errands.find((t) => t.id === errandid);

      if (!findErrandUserId) {
        return ApiResponse.notFound(res, "Recado");
      }

      return ApiResponse.success(
        res,
        "Recado criado com sucesso",
        findErrandUserId.toJsonE()
      );
    } catch (error: any) {
      return ApiResponse.serverError(res, error);
    }
  }
}
