import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTeachersTable1669143734156 implements MigrationInterface {
  name = 'createTeachersTable1669143734156';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "teachers" ("id" SERIAL NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "name" character varying NOT NULL, "surname" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, CONSTRAINT "UQ_00634394dce7677d531749ed8e8" UNIQUE ("email"), CONSTRAINT "PK_2f807294148612a9751dacf1026" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "teachers"`);
  }
}
