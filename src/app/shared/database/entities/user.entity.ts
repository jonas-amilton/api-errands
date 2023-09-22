import { Column, Entity, OneToMany } from "typeorm";

// Importa a entidade ErrandEntity, que representa os recados relacionados ao usuário.
import { ErrandEntity } from "./errand.entity";
import { BaseEntity } from "./base.entity";

/**
 * Define a entidade "users" que será mapeada no banco de dados.
 * @class UserEntity
 * @extends BaseEntity
 * @author Jonas Silva

 */
@Entity("users")
export class UserEntity extends BaseEntity {
  /**
   * Nome do usuário.
   * @property {string} name
   */
  @Column({ name: "name" })
  name!: string;

  /**
   * Email do usuário.
   * @property {string} email
   */
  @Column()
  email!: string;

  /**
   * Senha do usuário.
   * @property {string} password
   */
  @Column({ name: "password" })
  password!: string;

  /**
   * Relação One-to-Many com a entidade ErrandEntity.
   * Isso significa que um usuário possui muitos recados associados a ele.
   * @property {ErrandEntity[]} errands
   */
  @OneToMany(() => ErrandEntity, (entity) => entity.user)
  errands!: ErrandEntity[];
}

// Copyright [Jonas Silva]
