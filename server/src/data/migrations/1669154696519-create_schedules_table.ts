import { MigrationInterface, QueryRunner } from 'typeorm';

export class createSchedulesTable1669154696519 implements MigrationInterface {
  name = 'createSchedulesTable1669154696519';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "schedules" ("id" SERIAL NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "name" character varying NOT NULL, "time" character varying NOT NULL, "classroom" character varying NOT NULL, "teacher_id" integer, "discipline_id" integer, "group_id" integer, CONSTRAINT "PK_1c05e42aec7371641193e180046" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedules" ADD CONSTRAINT "FK_cfacddd81efeda13acadb93d42b" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedules" ADD CONSTRAINT "FK_d34a116263ef343caa16eab3a3b" FOREIGN KEY ("discipline_id") REFERENCES "disciplines"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedules" ADD CONSTRAINT "FK_b9579e4a3a46e2afdae0b757048" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "schedules" DROP CONSTRAINT "FK_b9579e4a3a46e2afdae0b757048"`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedules" DROP CONSTRAINT "FK_d34a116263ef343caa16eab3a3b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedules" DROP CONSTRAINT "FK_cfacddd81efeda13acadb93d42b"`,
    );
    await queryRunner.query(`DROP TABLE "schedules"`);
  }
}
