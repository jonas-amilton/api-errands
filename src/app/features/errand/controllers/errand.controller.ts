import { Request, Response, response } from "express";
import { ApiResponse } from "../../../shared/util/http-response.adapter";
import { usersDb } from "../../../shared/database/users.db";
import { ErrandModel } from "../../../models/index";
import { errandsDb } from "../../../shared/database/errandsDb";
import { ErrandRepository } from "../repositories/errands.repository";
import { CreateErrandUseCase } from "../usecase/create-errand.usecase";
import { GetUserErrandsUseCase } from "../usecase/get-user-errands.usecase";
import { DeleteErrandUseCase } from "../usecase/delete-errand.usecase";
import { UpdateErrandUsecase } from "../usecase/update-errand.usecase";
import { UserRepository } from "../../user/respositories/user.repository";

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

  public async list(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const userRepository = new UserRepository();

      const user = await userRepository.getUserById(userId);

      if (!user) {
        return ApiResponse.notFound(res, "Usuário não encontrado");
      }

      await userRepository.getUserById(userId);

      return ApiResponse.success(res, "Usuarios listados com sucesso!", user);
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

  public async update(req: Request, res: Response) {
    try {
      const { errandId } = req.params;
      const { title, description } = req.body;


      const errandRepository = new ErrandRepository();

      const errand = await errandRepository.getErrandsById(errandId);

      if (!errand) {
        return ApiResponse.notFound(res, "Recado não encontrado");
      }

      await errandRepository.updateErrand(errandId,  title, description );


      return ApiResponse.success(res, "Recado atualizado com sucesso");
    } catch (error: any) {
      return ApiResponse.serverError(res, error);
    }
  }
}
