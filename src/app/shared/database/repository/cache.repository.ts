import { Database } from "../../../../main/database/database.connection";
import { CacheDatabase } from "../../../../main/database/cache.connection";
import { ErrandModel } from "../../../models/index";
import { ErrandEntity } from "../entities/errand.entity";

/**
 * Parâmetros para listar tarefas.
 * @author Jonas Silva
 */


/**
 * Repositório para interagir com o cache e o banco de dados relacionados a tarefas.
 * @class CacheRepository
 */
export class CacheRepository {
  private _repository = CacheDatabase.connection;

  /**
   * Obtém um valor do cache usando a chave especificada.
   * @param {string} key - A chave do cache.
   * @returns {any} O valor obtido do cache ou null se não encontrado.
   */
  public async get(key: string) {
    const result = await this._repository.get(key);

    if (!result) {
      return null;
    }

    return JSON.parse(result);
  }

  /**
   * Define um valor no cache com a chave e o valor fornecidos.
   * @param {string} key - A chave do cache.
   * @param {any} value - O valor a ser definido no cache.
   */
  public async set(key: string, value: any) {
    await this._repository.set(key, JSON.stringify(value));
  }

  /**
   * Define um valor no cache com uma expiração em segundos.
   * @param {string} key - A chave do cache.
   * @param {any} value - O valor a ser definido no cache.
   * @param {number} seconds - O tempo de expiração em segundos.
   */
  public async setEx(key: string, value: any, seconds: number) {
    await this._repository.setex(key, seconds, JSON.stringify(value));
  }

  /**
   * Exclui um valor do cache com a chave especificada.
   * @param {string} key - A chave do cache.
   */
  public async delete(key: string) {
    await this._repository.del(key);
  }

// Obtém o repositório da entidade 'ErrandEntity' usando a conexão do Database
private repositoryDatabase = Database.connection.getRepository(ErrandEntity);

// Atualiza uma tarefa no banco de dados com os valores fornecidos
public async update(key: ErrandModel) {
  await this.repositoryDatabase.update(
    {
      id: key._id,
    },
    {
      type: key.type,
      description: key.description,
      title: key.title,
    }
  );
}




// Converte uma linha da entidade 'ErrandEntity' em um objeto 'Errands'
// private mapRowToModel(row: ErrandEntity) {
//   return Errands.create(row);
// }
}

// Copyright [Jonas Silva]
