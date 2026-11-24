import { MigrationInterface, QueryRunner } from "typeorm";

export class AuthMigration1795523521813 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "auth" (
            "user_id" INTEGER NOT NULL,
            "accessKey" VARCHAR NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );
            `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "auth"`)
    }

}
