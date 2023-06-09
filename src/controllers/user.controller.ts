import { Request, Response } from "express";
import { User } from "../models/user";
import { usersDb } from "../database/users";
import { ApiResponse } from "../util/http-response.adapter";

export class UserController {
  public create(req: Request, res: Response) {
    try {
      const { password, email } = req.body;

      const user = new User(email, password);

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

  public list(req: Request, res: Response) {
    try {
      const { email } = req.query;

      let result = usersDb;

      if (email) {
        result = usersDb.filter((u) => u.email === email);
      }

      return ApiResponse.success(
        res,
        "Lista de usuarios",
        result.map((u) => u.toJson())
      );
    } catch (error: any) {
      return ApiResponse.serverError(res, error);
    }
  }

  public delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const userIndex = usersDb.findIndex((u) => u.id === id);

      if (userIndex < 0) {
        return ApiResponse.notFound(res, "User not found");
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
      const { password, email } = req.body;

      const userFind = usersDb.find((u) => u.id === id);

      if (!userFind) {
        return ApiResponse.notFound(res, "ID");
      }

      if (password) {
        userFind.password = password;
      }

      if (email) {
        userFind.email = email;
      }

      return ApiResponse.success(
        res,
        "usuario atualizado com sucesso!",
        userFind.toJson()
      );
    } catch (error: any) {
      return ApiResponse.serverError(res, error);
    }
  }

  public login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email) {
        return ApiResponse.notFound(res, "Email invalido");
      }

      if (!password) {
        return ApiResponse.notFound(res, "Senha invalida");
      }

      const user = usersDb.find((u) => u.email);

      if (!user) {
        return ApiResponse.notFound(res, "não encontrado");
      }

      if (user.password != password) {
        return ApiResponse.unauthorized(res, "não autorizado");
      }

      return ApiResponse.success(res, "Login foi um sucesso", user.toJson());
    } catch (error: any) {
      return ApiResponse.badGateway(res, error);
    }
  }
}
