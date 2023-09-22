import { UserModel } from "../../../models/index";
import { UserRepository } from "../respositories/user.repository";

export class CreateUserUseCase {
  constructor(private _repository: UserRepository) {}

  async execute(name: string, email: string, password: string) {
    const user = UserModel.create(name, email, password);

    return await this._repository.createUser(user);
  }

  async checkValidEmail(email: string) {
    return await this._repository.checkValidEmail(email);
  }
}
