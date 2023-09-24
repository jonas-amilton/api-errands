import supertest from "supertest";

import {UserEntity} from '../../../../../src/app/shared/database/entities/user.entity';
import {CacheRepository} from '../../../../../src/app/shared/database/repository/cache.repository';
import {createApp} from '../../../../../src/main/configs/express.config';
import { Database } from "../../../../../src/main/database";
import { CacheDatabase } from "../../../../../src/main/database";

describe('User Controller - CREATE', ()=>{
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
    
      const createBodySut = () => {
        return {
          email: "any_email",
          name: "any_name",
          password: "any_password",
        };
      };

const route = '/users';

test('Deve retornar erro (400) quando o nome não for informado no body.', async () => { 
    const sut = createSut();

    const result = await supertest(sut)
      .post(route)
      .send({
        email: "any_email",
        password: "any_password",
      });

    expect(result).toBeDefined();
    expect(result.status).toEqual(400);

    expect(result.body).toHaveProperty("ok", false);
    expect(result.body).toHaveProperty("message", "Campo Nome não fornecido..");
    expect(result.body).not.toHaveProperty("data");
    expect(result.body).not.toHaveProperty("code");
});

test('Deve retornar erro (400) quando o email não for informado no body.', async () => { 
    const sut = createSut();

    const result = await supertest(sut)
      .post(route)
      .send({
        name: "any_name",
        password: "any_password",
      });

    expect(result).toBeDefined();
    expect(result.status).toEqual(400);

    expect(result.body).toHaveProperty("ok", false);
    expect(result.body).toHaveProperty("message", "Campo Email não fornecido..");
    expect(result.body).not.toHaveProperty("data");
    expect(result.body).not.toHaveProperty("code");
});

test('Deve retornar erro (400) quando o password não for informado no body.', async () => { 
    const sut = createSut();

    const result = await supertest(sut)
      .post(route)
      .send({
        name: "any_name",
        password: "any_password",
      });

    expect(result).toBeDefined();
    expect(result.status).toEqual(400);

    expect(result.body).toHaveProperty("ok", false);
    expect(result.body).toHaveProperty("message", "Campo Email não fornecido..");
    expect(result.body).not.toHaveProperty("data");
    expect(result.body).not.toHaveProperty("code");
});


// testei no postman e dbvear, criou usuario corretamente
// aqui por razões desconhecidas retornou 500
test("Deve retornar (200) quando criado com sucesso.", async () => {
    const sut = createSut();
    const bodySut = createBodySut();
  
    jest.spyOn(CacheRepository.prototype, "set").mockResolvedValue();
  
    const result = await supertest(sut).post(route).send(bodySut);
  
    expect(result).toBeDefined();
    expect(result.status).toEqual(200);
  
    expect(result.body).toHaveProperty("ok", true);
    expect(result.body).toHaveProperty(
      "message",
      "Usuario criado com sucesso!"
    );
    expect(result.body).toHaveProperty("code", 200);
    expect(result.body).not.toHaveProperty("data");
  });
  

})