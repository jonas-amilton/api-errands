import { UserRepository } from "../respositories/user.repository";

export class GetUserByEmailUseCase {
	constructor(private _repository: UserRepository) {}

	async execute(email: string) {
		const response = await this._repository.getUserByEmail(email);

		return response;
	}
}
