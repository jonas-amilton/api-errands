import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateErrandsTable1630961523121 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS errands (
                id UUID PRIMARY KEY,
                id_user UUID NOT NULL,
                title VARCHAR(100) NOT NULL,
                description VARCHAR(100) NOT NULL,
                type VARCHAR(1) NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
                updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
            )
        `);

    await queryRunner.query(`
        INSERT INTO errands (id, id_user, title, description, type)
        VALUES 
        ('1', '1', 'Tarefa 1', 'Descrição da tarefa 1', 'P'),
        ('2', '2', 'Tarefa 2', 'Descrição da tarefa 2', 'A'),
        ('3', '3', 'Tarefa 3', 'Descrição da tarefa 3', 'P');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DROP TABLE IF EXISTS errands");
  }
}

// comando para fazer migration manualmente
// npm run typeorm migration:run -- -d ./src/main/configs/database.config.ts
