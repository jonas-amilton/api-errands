import supertest from "supertest";

import { ErrandEntity } from "../../../../../src/app/shared/database/entities/errand.entity";
import { CacheRepository } from "../../../../../src/app/shared/database/repository/cache.repository";
import { createApp } from "../../../../../src/main/configs/express.config";
import { Database } from "../../../../../src/main/database";
import { CacheDatabase } from "../../../../../src/main/database";

describe("Errand Controller - CREATE", () => {
  beforeAll(async () => {
    await Database.connect();
    await CacheDatabase.connect();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  afterAll(async () => {
    await Database.connection.manager.delete(ErrandEntity, {});
    await Database.connection.destroy();
    await CacheDatabase.connection.quit();
  });

  const createSut = () => {
    return createApp();
  };

  const createBodySut = () => {
    return {
      title: "any_title",
      description: "any_description",
    };
  };

  const route = "/errands";

  test("Deve retornar erro (400) quando o titulo não for informado no body.", async () => {
    const sut = createSut();

    const result = await supertest(sut).post(route).send({
      description: "any_description",
    });

    expect(result).toBeDefined();
    expect(result.status).toEqual(400);

    expect(result.body.ok).toEqual(false);
    expect(result.body.message).toEqual("Campo Titulo não fornecido..");
    expect(result.body).not.toHaveProperty("data");
    expect(result.body).not.toHaveProperty("code");
  });

  test("Deve retornar erro (400) quando a descricção não for informada no body.", async () => {
    const sut = createSut();

    const result = await supertest(sut).post(route).send({
      title: "any_title",
    });

    expect(result).toBeDefined();
    expect(result.status).toEqual(400);

    expect(result.body.ok).toEqual(false);
    expect(result.body.message).toEqual("Campo Description não fornecido..");
    expect(result.body).not.toHaveProperty("data");
    expect(result.body).not.toHaveProperty("code");
  });
});
