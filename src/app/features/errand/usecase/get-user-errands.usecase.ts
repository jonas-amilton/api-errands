import { CacheRepository } from "../../../shared/database/repository/cache.repository";
import { ErrandRepository } from "../repositories/errands.repository";


export class GetUserErrandsUseCase {
    constructor(private _repository: ErrandRepository) {}

    async execute(userId: string, noCache?: boolean) {
        const cacheRepository = new CacheRepository();

        if (!noCache) {
			const cache = await cacheRepository.get(
				`USER_ERRAND_LIST_${userId}`
			);

			if (cache) {
				return cache;
			}
			const response = await this._repository.getErrandById(userId);

			return response;
		}

		const response = await this._repository.getErrandById(userId);

		return response;
    }
}