import * as dotenv from "dotenv";
dotenv.config();

/**
 * Configuração para conexão com o servidor Redis.
 * @module RedisConfig
 * @type {object}
 * @property {string} host - O host do servidor Redis.
 * @property {number} port - A porta do servidor Redis.
 * @property {string} username - O nome de usuário para autenticação no servidor Redis.
 * @property {string} password - A senha para autenticação no servidor Redis.
 * @author Jonas Silva
 */
export default {
    host: process.env.REDIS_HOST!,
    port: Number(process.env.REDIS_PORT!),
    username: process.env.REDIS_USER!,
    password: process.env.REDIS_PASS!,
};



// Copyright [Jonas Silva]