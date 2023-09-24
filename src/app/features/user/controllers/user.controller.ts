import { Request, Response } from "express";
import { UserModel } from "../../../models/index";
import { usersDb } from "../../../shared/database/users.db";
import { ApiResponse } from "../../../shared/util/http-response.adapter";
import { CreateUserUseCase, GetUsersUseCase } from "../usecase";
import { UserRepository } from "../respositories/user.repository";



//todo: refatorar o controller apos usecase
export class UserController {
  public async create(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      if(!name){
        ApiResponse.notProvided(res, name)
      }

      if(!email){
        ApiResponse.notProvided(res, email)
      }

      if(!password){
        ApiResponse.notProvided(res, password)
      }

      const useCase = new CreateUserUseCase(new UserRepository());

      const response = await useCase.execute(name, email, password);

      return ApiResponse.success(res, "Usuario criado com sucesso!", response);
    } catch (error: any) {
      return ApiResponse.serverError(res, error);
    }
  }

  public async getById(req: Request, res: Response) {
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
      const userId = req.params.id;
      const userRepository = new UserRepository();

      const user = await userRepository.getUserById(userId);

      if (!user) {
        return ApiResponse.notFound(res, "Usuário não encontrado");
      }

      await userRepository.deleteUser(userId);

      return ApiResponse.success(res, "Usuário deletado com sucesso", user);
    } catch (error: any) {
      return ApiResponse.serverError(res, error);
    }
  }

  
  public async update(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const { name, email, password } = req.body;

      const userRepository = new UserRepository();

      const updatedUser = await userRepository.updateUser(userId, name, email, password);

      if (!updatedUser) {
        return ApiResponse.notFound(res, "Usuário não encontrado");
      }

      return ApiResponse.success(res, "Usuário atualizado com sucesso!");
    } catch (error: any) {
      return ApiResponse.serverError(res, error);
    }
  }
}
