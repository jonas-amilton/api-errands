import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1630961523121 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS users (
                id UUID PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(50) NOT NULL,
                passwrd VARCHAR(100) NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
                updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
            )
        `);

    await queryRunner.query(`
        INSERT INTO users (id, name, email, password)
        VALUES 
        ('1', 'jonas', 'jonas@gmail.com', 'senha1'),
        ('2', 'barbara', 'barbara@gmail.com', 'senha2'),
        ('3', 'jade', 'jade@gmail.com', 'senha3');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DROP TABLE IF EXISTS users");
  }
}
