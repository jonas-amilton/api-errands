import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

// Importa a entidade UserEntity, que será usada para estabelecer a relação Many-to-One com os usuários.
import { UserEntity } from "./user.entity";
import {BaseEntity} from './base.entity'

/**
 * Define a entidade "errands" que será mapeada no banco de dados.
 * @class ErrandEntity
 * @extends BaseEntity
 * @author Jonas Silva

 */
@Entity("errands")
export class ErrandEntity extends BaseEntity {
  /**
   * ID do usuário associado ao recado.
   * @property {string} userId
   */
  @Column({ name: "id_user" })
  userId!: string;

  /**
   * Título do recado.
   * @property {string} title
   */
  @Column()
  title!: string;

  /**
   * Descrição do recado.
   * @property {string} description
   */
  @Column()
  description!: string;


  /**
   * Relação Many-to-One com a entidade UserEntity.
   * Isso significa que muitos errands pertencem a um único usuário.
   * @property {UserEntity} user
   */
  @ManyToOne(() => UserEntity, (entity) => entity.errands)
  @JoinColumn({ name: "id_user", referencedColumnName: "id" })
  user!: UserEntity;
}

// Copyright [Jonas Silva]
