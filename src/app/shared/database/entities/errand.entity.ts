import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

// Importa a entidade UserEntity, que será usada para estabelecer a relação Many-to-One com os usuários.
import { UserEntity, BaseEntity } from "./index";
import { TypeErrand } from "../../../models/index";

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
   * @property {string} idUser
   */
  @Column({ name: "id_user" })
  idUser!: string;

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
   * Tipo do recado (Public ou Archived) representado pelo enum ErrandType.
   * @property {TypeErrand} type
   */
  @Column({ type: "varchar", length: 1, enum: TypeErrand })
  type: TypeErrand;

  /**
   * Relação Many-to-One com a entidade UserEntity.
   * Isso significa que muitos errands pertencem a um único usuário.
   * @property {UserEntity} user
   */
  @ManyToOne(() => UserEntity, (entity) => entity.errands)
  @JoinColumn({ name: "id_usuario", referencedColumnName: "id" })
  user!: UserEntity;
}

// Copyright [Jonas Silva]
