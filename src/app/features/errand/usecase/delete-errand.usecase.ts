import { CacheRepository } from "../../../shared/database/repository/cache.repository";
import { ErrandRepository } from "../repositories/errands.repository";
import { GetUserErrandsUseCase } from "./get-user-errands.usecase";


export class DeleteErrandUseCase {
    constructor(private _repository: ErrandRepository) {}

    async execute(id: string, userId: string) {
        const response = await this._repository.deleteErrand(id);

        this.setUserErrandsCache(userId);

        return response;
    }

    async checkErrandId(id: string) {
        const response = await this._repository.checkErrandId(id);

        return response; 
    }

    async setUserErrandsCache(userId: string) {
		const userErrands = await new GetUserErrandsUseCase(
			new ErrandRepository()
		).execute(userId, true);

		const cacheRepository = new CacheRepository();

		cacheRepository.set(`USER_ERRANDS_LIST_${userId}`, userErrands);
	}
}