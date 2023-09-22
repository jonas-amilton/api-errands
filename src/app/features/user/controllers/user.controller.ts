import { Request, Response } from "express";
import { UserModel } from "../../../models/index";
import { usersDb } from "../../../shared/database/users.db";
import { ApiResponse } from "../../../shared/util/http-response.adapter";

export class UserController {
  public create(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      const user = new UserModel(name, email, password);
      usersDb.push(user);
      return ApiResponse.success(res, "Usuario criado com sucesso!", user);
    } catch (error: any) {
      return ApiResponse.serverError(res, error);
    }
  }

  public get(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const result = usersDb.find((user) => user.id === id);

      if (!result) {
        return ApiResponse.notFound(res, "Usuario");
      }

      return ApiResponse.success(
        res,
        "Usuario filtrado por id com sucesso!",
        result.toJson()
      );
    } catch (error: any) {
      return ApiResponse.serverError(res, error);
    }
  }

  public list(req: Request, res: Response) {
    try {
      const { name, email } = req.query;

      let result = usersDb;

      if (name) {
        result = usersDb.filter((user) => user.name === name);
      }

      if (email) {
        result = usersDb.filter((user) => user.email === email);
      }

      return ApiResponse.success(
        res,
        "Lista de usuarios",
        result.map((users) => users.toJson())
      );
    } catch (error: any) {
      return ApiResponse.serverError(res, error);
    }
  }

  public delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const userIndex = usersDb.findIndex((user) => user.id === id);

      if (userIndex < 0) {
        return ApiResponse.notFound(res, "Id");
      }

      const deleteUser = usersDb.splice(userIndex, 1);

      return ApiResponse.success(
        res,
        "Usuario deletado com sucesso",
        deleteUser[0].toJson()
      );
    } catch (error: any) {
      return ApiResponse.serverError(res, error);
    }
  }

  public update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;

      const userFind = usersDb.find((user) => user.id === id);

      if (!userFind) {
        return ApiResponse.notFound(res, "Id");
      }

      if (name) {
        userFind.name = name;
      }

      if (email) {
        userFind.email = email;
      }

      if (password) {
        userFind.password = password;
      }

      return ApiResponse.success(
        res,
        "Usuario atualizado com sucesso!",
        userFind.toJson()
      );
    } catch (error: any) {
      return ApiResponse.serverError(res, error);
    }
  }
}
