import Redis from "ioredis";
import config from "../configs/redis.config";

/**
 * Classe responsável por gerenciar a conexão com o banco de dados em cache (Redis).
 * @class CacheDatabase
 * @static
 * @property {Redis} _connection - A conexão ativa com o banco de dados em cache.
 * @property {Redis} connection - Propriedade estática que fornece acesso à conexão com o banco de dados em cache.
 * @function connect - Método para estabelecer a conexão com o banco de dados em cache.
 * @module CacheDatabase
 * @author Jonas Silva
 */
export class CacheDatabase {
  private static _connection: Redis;

  /**
   * Fornece acesso à conexão com o banco de dados em cache.
   * @property connection
   * @type {Redis}
   * @static
   */
  public static get connection() {
    return this._connection;
  }

  /**
   * Estabelece a conexão com o banco de dados em cache.
   * @function connect
   * @async
   */
  public static async connect() {
    this._connection = new Redis(config);
    console.log("Redis Database is connected!");
  }
}


// Copyright [Jonas Silva]