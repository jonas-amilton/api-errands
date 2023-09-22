import { UserRepository } from "../respositories/user.repository";

export class GetUsersUseCase {
	constructor(private _repository: UserRepository) {}

	async execute() {
		const response = await this._repository.listUser();

		return response;
	}
}