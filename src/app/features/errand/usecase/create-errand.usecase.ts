

import { ErrandModel } from "../../../models";
import { CacheRepository } from "../../../shared/database/repository/cache.repository";
import { UserRepository } from "../../user/respositories/user.repository";
import { ErrandRepository } from "../repositories/errands.repository";
import { GetUserErrandsUseCase } from "./get-user-errands.usecase";


export class CreateErrandUseCase {
    constructor(private _repository: ErrandRepository | UserRepository) {}

    async execute(title: string, description: string ,userId: string) {
        const newErrand = await ErrandModel.create(title, description, userId);

        if(this._repository instanceof ErrandRepository) {
            const response = await this._repository.addErrand(newErrand);

            this.setUserErrandCache(userId);
			this.steErrandCache(newErrand);

        return response;
    }
}

    async checkuserId(userId: string) {
        if (this._repository instanceof UserRepository) {
            const response = await this._repository.checkUserId(userId);

        return response;
    }
}

    async setUserErrandCache(userId: string) {
        const userErrands = await new GetUserErrandsUseCase(
            new ErrandRepository()
    ).execute(userId, true);

    const cacheRepository = new CacheRepository();

    cacheRepository.set(`USER_ERRANDS_LIST_${userId}`, userErrands);
}

    async steErrandCache(errand: ErrandModel) {
        const cacheRepository = new CacheRepository();

        cacheRepository.set(`ERRAND_${errand.id}`, errand);
    }
}