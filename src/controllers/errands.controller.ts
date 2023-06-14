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

  public list(req: Request, res: Response) {
    try {
      const { userid } = req.params;
      const { type, title } = req.query;

      const findUser = usersDb.find((u) => u.id === userid);

      if (!findUser?.errands) {
        return ApiResponse.notFound(
          res,
          `Recado do usuario ${findUser?.name} não encontrado!`
        );
      }

      const errands = findUser.errands;

      const findType = findUser.errands.filter((t) => t.type === type);

      if (type) {
        return ApiResponse.success(
          res,
          "Recado foi filtrado com sucesso pelo tipo",
          findType
        );
      }

      const findTitle = findUser.errands.filter((t) => t.title === title);

      if (title) {
        return ApiResponse.success(
          res,
          "Recado filtrado com sucesso pelo titulo",
          findTitle
        );
      }

      let publicErrands = errands.filter((t) => t.type === TypeErrands.Public);

      let archivedErrands = errands.filter(
        (t) => t.type === TypeErrands.Archived
      );

      return ApiResponse.success(res, "Transações listadas com sucesso", {
        errands,
        categoryErrands: { publicErrands, archivedErrands },
      });
    } catch (error: any) {
      return ApiResponse.serverError(res, error);
    }
  }

  public delete(req: Request, res: Response) {
    try {
      const { userid, errandid } = req.params;

      const findUser = usersDb.find((u) => u.id === userid);

      if (!findUser) {
        return ApiResponse.notFound(res, "Usuario");
      }

      const findErrandId = findUser.errands.findIndex((i) => i.id === errandid);

      if (findErrandId < 0) {
        return ApiResponse.notFound(res, "recado");
      }

      const deleteErrand = findUser.errands.splice(findErrandId, 1);

      return ApiResponse.success(
        res,
        "Recado deletado com sucesso",
        deleteErrand[0].toJsonE()
      );
    } catch (error: any) {
      return ApiResponse.serverError(res, error);
    }
  }
}
