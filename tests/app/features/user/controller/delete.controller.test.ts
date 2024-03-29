import supertest from "supertest";
import { UserEntity } from "../../../../../src/app/shared/database/entities/user.entity";
import { createApp } from "../../../../../src/main/configs/express.config";
import { Database } from "../../../../../src/main/database";
import { CacheDatabase } from "../../../../../src/main/database";

describe("User Controller - DELETE", () => {
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

  test("Deve retornar erro (404) quando Usuário não encontrado no body.", async () => {
    const sut = createSut();

    const result = await supertest(sut).get(route).send({
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
