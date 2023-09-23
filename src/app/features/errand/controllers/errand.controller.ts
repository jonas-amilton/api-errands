import { Request, Response } from "express";
import { ApiResponse } from "../../../shared/util/http-response.adapter";
import { usersDb } from "../../../shared/database/users.db";
import { ErrandModel } from "../../../models/index";
import { errandsDb } from "../../../shared/database/errandsDb";
import { ErrandRepository } from "../repositories/errands.repository";
import { CreateErrandUseCase } from "../usecase/create-errand.usecase";
import { GetUserErrandsUseCase } from "../usecase/get-user-errands.usecase";
import { DeleteErrandUseCase } from "../usecase/delete-errand.usecase";

export class ErrandController {
  public async create(req: Request, res: Response) {
    try {
      const { title, description, userId } = req.body;

      const useCase = new CreateErrandUseCase(new ErrandRepository());

      await useCase.execute(title, description, userId);

      return ApiResponse.success(res, "Sucesso");
    } catch (error: any) {
      return ApiResponse.serverError(res, error);
    }
  }

  public async getById(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const usecase = new GetUserErrandsUseCase(new ErrandRepository());
      const result = await usecase.execute(userId);


      return ApiResponse.success(
        res,
        "Recados listados com sucesso pelo ID",
        result
      );
    } catch (error: any) {
      return ApiResponse.serverError(res, error);
    }
  }

  public list(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { type, title, description } = req.query;

      const findIdUser = usersDb.find((user) => user.id === userId);
      if (!findIdUser?.errand) {
        return ApiResponse.notFound(
          res,
          `Recado do usuario ${findIdUser?.name} não encontrado!`
        );
      }

      // const findType = findIdUser.errand.filter((t) => t.type === type);
      // if (type) {
      //   return ApiResponse.success(res, "Recado filtrado por tipo!", findType);
      // }

      const findTitle = findIdUser.errand.filter((t) => t.title === type);
      if (title) {
        return ApiResponse.success(
          res,
          "Recado filtrado por titulo!",
          findTitle
        );
      }


      let errandList = findIdUser.errand;

      return ApiResponse.success(res, "Recados listadas com sucesso", {
        errandList
      });
    } catch (error: any) {
      return ApiResponse.serverError(res, error);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
        const { errandId } = req.params;

      const errandRepository = new ErrandRepository();

      const errand = await errandRepository.getErrandsById(errandId);

      if (!errand) {
        return ApiResponse.notFound(res, "Recado não encontrado");
      }

      await errandRepository.deleteErrand(errandId);

      return ApiResponse.success(res, "Recado deletado com sucesso");
    } catch (error: any) {
      return ApiResponse.serverError(res, error);
    }
  }

  public update(req: Request, res: Response) {
    try {
      const { userId, errandId } = req.params;
      const { title, type, description } = req.body;

      const findIdUser = usersDb.find((user) => user.id === userId);
      if (!findIdUser) {
        return ApiResponse.notFound(res, "Usuario");
      }

      const findIdErrand = findIdUser.errand.find(
        (item) => item.id === errandId
      );
      if (!findIdErrand) {
        return ApiResponse.notFound(res, "Recado");
      }

      if (title) {
        findIdErrand.title = title;
      }

      // if (type) {
      //   findIdErrand.type = type;
      // }

      if (description) {
        findIdErrand.description = description;
      }

      return ApiResponse.success(
        res,
        "Recado atualizado",
        findIdErrand.toJsonE()
      );
    } catch (error: any) {
      return ApiResponse.serverError(res, error);
    }
  }
}
