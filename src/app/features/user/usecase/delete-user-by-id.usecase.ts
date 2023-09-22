import { UserRepository } from "../respositories/user.repository";

export class DeleteUserByIdUseCase {
  constructor(private _repository: UserRepository) {}

  async execute(id: string) {
    const response = await this._repository.deleteUser(id);

    return response;
  }
}
