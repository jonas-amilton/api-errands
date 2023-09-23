import { UserRepository } from "../respositories/user.repository";

export class GetUserByIdUseCase {
	constructor(private _repository: UserRepository) {}

	async execute(id: string) {
		const response = await this._repository.getUserById(id);

		return response;
	}
}
