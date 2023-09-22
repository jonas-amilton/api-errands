import { DataSource } from "typeorm";
import databaseConfig from "../configs/database.config";

/**
 * Classe responsável por gerenciar a conexão com o banco de dados.
 * @class Database
 * @static
 * @property {DataSource} _connection - A conexão ativa com o banco de dados.
 * @function connect - Método para estabelecer a conexão com o banco de dados.
 * @property {DataSource} connection - Propriedade estática que fornece acesso à conexão com o banco de dados.
 * @module Database
 * @author Jonas Silva
 */
export class Database {
  private static _connection: DataSource;

  /**
   * Estabelece a conexão com o banco de dados.
   * @function connect
   * @async
   */
  public static async connect() {
    this._connection = await databaseConfig.initialize();
    console.log("PostgreSQL Database is connected");
  }

  /**
   * Fornece acesso à conexão com o banco de dados.
   * @property connection
   * @type {DataSource}
   * @static
   */
  public static get connection() {
    return this._connection;
  }
}

// Copyright [Jonas Silva]