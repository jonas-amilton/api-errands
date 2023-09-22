import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

/**
 * Classe base que define propriedades comuns para entidades no TypeORM.
 * @class BaseEntity
 * @author Jonas Silva

 */
export class BaseEntity {
  /**
   * Identificador único gerado automaticamente em formato UUID.
   * @property {string} id
   */
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  /**
   * Data de criação da entidade.
   * @property {Date} createdAt
   */
  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  /**
   * Data de atualização da entidade.
   * @property {Date} updatedAt
   */
  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;
}


// Copyright [Jonas Silva]
