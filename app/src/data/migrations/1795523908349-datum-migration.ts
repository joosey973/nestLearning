import { MigrationInterface, QueryRunner } from "typeorm";

export class DatumMigration1795523908349 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "datum" (
            "id" SERIAL PRIMARY KEY,
            "user_id" INTEGER NOT NULL,
            "data" jsonb,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );
            `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "datum"`)
    }

}
