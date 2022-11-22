import { MigrationInterface, QueryRunner } from 'typeorm';

export class createDisciplinesTable1669132100362 implements MigrationInterface {
  name = 'createDisciplinesTable1669132100362';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "disciplines" ("id" SERIAL NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "name" character varying NOT NULL, CONSTRAINT "PK_139512aefbb11a5b2fa92696828" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "disciplines"`);
  }
}
