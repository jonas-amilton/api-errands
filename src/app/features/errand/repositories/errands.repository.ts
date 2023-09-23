import { Database } from "../../../../main/database";
import { ErrandModel } from "../../../models";
import { ErrandEntity } from "../../../shared/database/entities/errand.entity";

interface IErrandUpdateParams {
  title?: string;
  description?: string;
  type?: string;
}

export class ErrandRepository {
  private _repository = Database.connection.getRepository(ErrandEntity);

  private toModel({
    title,
    description,
    userId,
    id,
  }: ErrandEntity): ErrandModel {
    return ErrandModel.create(title, description, userId, id);
  }

  async addErrand(errand: ErrandModel): Promise<ErrandModel> {
    const newErrand = this._repository.create(errand);

    const response = await this._repository.save(newErrand);

    return this.toModel(response);
  }

  async getErrandsById(userId: string): Promise<ErrandEntity[]> {
    const response = await this._repository.find({
      where: { userId },
    });
  
    return response;
  }
  
}
