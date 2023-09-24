import { CacheRepository } from "../../../shared/database/repository/cache.repository";
import { ErrandRepository } from "../repositories/errands.repository";
import { GetUserErrandsUseCase } from "./get-user-errands.usecase";

export class UpdateErrandUsecase {
  constructor(private _repository: ErrandRepository) {}

  async execute(
    title: string,
    description: string,
    errandId: string,
    userId: string
  ) {
    const response = this._repository.updateErrand(errandId, title, description);

    this.setUserErrandsCache(userId);

    return response;
  }

  async checkErrandId(errandId: string) {
    const response = await this._repository.checkErrandId(errandId);

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
