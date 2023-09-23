import { Repository } from "typeorm";
import { Database } from "../../../../main/database/index";
import { UserModel } from "../../../models/index";
import { UserEntity } from "../../../shared/database/entities/user.entity";


interface IErrandUpdateParams {
  name?: string,
  email?: string,
  password?: string
}

/**
 * Repositório responsável por interagir com a base de dados e manipular entidades de usuário.
 * @class UserRepository
 * @example const userRepository = new UserRepository();
 *          const user = await userRepository.getByEmail("example@example.com");
 *          const createdUser = await userRepository.create(newUser);
 *          const userList = await userRepository.list();
 *          const userById = await userRepository.getById("user-id");
 *          const userByPassword = await userRepository.getByPassword("password123");
 * @implements UserRepository
 * @async Este código é assíncrono.
 * @author Jonas Silva
 */



export class UserRepository {
  private _repository = Database.connection.getRepository(UserEntity);

  public async createUser(user: UserModel) {
    const entity = this._repository.create({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    });
    const result = await this._repository.save(entity);

    return UserRepository.mapRowToModel(result);
  }

  public async updateUser(id: string, title?: string, email?: string, password?: string) {
    const data: IErrandUpdateParams = {};
    
    if(title) {
        data['name'] = title;
    }
        
    if(email) {
        data['email'] = email;
    }

    if(password) {
      data['password'] = password;
  }
    
    const response = await this._repository.update(id, data);

    return response;
}

  public async deleteUser(id: string) {
    const result = await this._repository.delete(id);
    return result.affected ?? undefined;
  }

  public async getUserByEmail(email: string): Promise<UserModel | undefined> {
    const result = await this._repository.findOne({ where: { email } });

    if (!result) {
      return undefined;
    }
    return UserRepository.mapRowToModel(result);
  }

  public async listUser() {
    const result = await this._repository.find();
    return result.map((entity) => UserRepository.mapRowToModel(entity));
  }

  async getUserById(id: string) {
		const response = await this._repository.findOne({ where: { id } });

		return response;
	}

  public async getUserByPassword(password: string) {
    const result = await this._repository.findOne({ where: { password } });

    if (!result) {
      return undefined;
    }

    return UserRepository.mapRowToModel(result);
  }

  async checkValidEmail(email: string): Promise<boolean> {
    const response = await this._repository.exist({where:{email}});

    return response;
}

  public static mapRowToModel(user?: UserEntity | null) {
    if (!user) {
      return undefined;
    }

    return UserModel.create(user.name, user.email, user.password);
  }
}

// Copyright [Jonas Silva]
