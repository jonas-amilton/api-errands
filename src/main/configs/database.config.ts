// Importa o módulo DataSource do TypeORM para configurar a conexão com o banco de dados.
import { DataSource } from "typeorm";
// Importa o módulo dotenv para carregar variáveis de ambiente a partir de um arquivo .env.
import * as dotenv from "dotenv";

// Carrega as variáveis de ambiente a partir do arquivo .env na raiz do projeto.
dotenv.config();

/**
 * Configuração da conexão com o banco de dados.
 * @class DatabaseConfig
 * @author Jonas Silva
 */
// Define os caminhos dos arquivos de entidades e migrações.
let entities = ["src/database/entities/**/*.ts"];
let migrations = ["src/database/migrations/**/*.ts"];

// Se a variável de ambiente DB_ENV for definida como "prod", ajusta os caminhos para os arquivos compilados (.js).
if (process.env.DB_ENV === "prod") {
  entities = ["src/database/entities/**/*.js"];
  migrations = ["src/database/migrations/**/*.js"];
}

// Cria uma nova configuração para a conexão com o banco de dados usando o DataSource do TypeORM.
let config = new DataSource({
  // Define o tipo de banco de dados como "postgres".
  type: "postgres",
  // Define o número da porta do banco de dados como 5432.
  port: 5432,
  // Utiliza as variáveis de ambiente para definir o host, nome do usuário, nome do banco e senha do banco de dados.
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,

  // Define opções de SSL para conexão segura com o banco de dados.
  ssl: {
    rejectUnauthorized: false,
  },
  // Synchronize é definido como false, o que significa que não sincronizará automaticamente as entidades com o banco de dados.
  synchronize: false,
  // Define o schema do banco de dados como "lista_de_recados".
  schema: "errands_list",
  logging: true,
  migrations: ["src/app/shared/database/migrations/**/*.ts"],
  entities: ["src/app/shared/database/entities/**/*.ts"],
});

if (process.env.DB_ENV === "test") {
  config = new DataSource({
    type: "sqlite",
    database: "db.sqlite3",
    // Synchronize é definido como false, o que significa que não sincronizará
    // automaticamente as entidades com o banco de dados.
    synchronize: false,
    logging: true,
    migrations: ["tests/app/shared/database/migrations/**/*.ts"],
    entities: ["src/app/shared/database/entities/**/*.ts"],
  });
}

export default config;

// Copyright [Jonas Silva]
