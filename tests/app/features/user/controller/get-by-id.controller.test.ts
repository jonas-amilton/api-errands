import supertest from "supertest";
import { UserEntity } from "../../../../../src/app/shared/database/entities/user.entity";
import { GetUserByIdUseCase } from "../../../../../src/app/features/user/usecase/get-user-by-id.usecase";
import express from "express";
import { createApp } from "../../../../../src/main/configs/express.config";
import { CacheRepository } from "../../../../../src/app/shared/database/repository/cache.repository";
import { Database } from "../../../../../src/main/database";
import { CacheDatabase } from "../../../../../src/main/database";
import { UserRepository } from "../../../../../src/app/features/user/respositories/user.repository";

describe("User Controller - GET BY ID", () => {
  beforeAll(async () => {
    await Database.connect();
    await CacheDatabase.connect();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  afterAll(async () => {
    await Database.connection.manager.delete(UserEntity, {});
    await Database.connection.destroy();
    await CacheDatabase.connection.quit();
  });

  const createSut = () => {
    return createApp();
  };

  const route = "/users/:userId";

  test('Deve retornar erro (404) quando Usuário não encontrado no body.', async () => { 
    const sut = createSut();

    const result = await supertest(sut)
      .get(route)
      .send({
        userId: "12345678",
      });

    expect(result).toBeDefined();
    expect(result.status).toEqual(404);

    expect(result.body).toHaveProperty("ok", false);
    expect(result.body).toHaveProperty("message", "Usuário não encontrado.");
    expect(result.body).not.toHaveProperty("data");
    expect(result.body).not.toHaveProperty("code");
});
});
