import { MigrationInterface, QueryRunner } from "typeorm";

export class UsersMigration1795523000000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "users" (
            "id" SERIAL PRIMARY KEY,
            "email" VARCHAR(50) UNIQUE,
            "name" VARCHAR(50),
            "password" VARCHAR(70),
            "blocked" BOOLEAN DEFAULT FALSE
            );
            `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS "users"
            `)
    }

}
