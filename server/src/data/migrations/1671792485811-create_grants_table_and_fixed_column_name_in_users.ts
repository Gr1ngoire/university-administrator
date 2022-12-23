import { MigrationInterface, QueryRunner } from 'typeorm';

export class createGrantsTableAndFixedColumnNameInUsers1671792485811
  implements MigrationInterface
{
  name = 'createGrantsTableAndFixedColumnNameInUsers1671792485811';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "column_name" TO "second_name"`,
    );
    await queryRunner.query(
      `CREATE TABLE "grants" ("id" SERIAL NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "user_id" integer NOT NULL, "granter_id" integer NOT NULL, CONSTRAINT "REL_501eb48e321a0f302707ec42aa" UNIQUE ("user_id"), CONSTRAINT "PK_a25f5f89eff8b3277f7969b7094" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "grants" ADD CONSTRAINT "FK_501eb48e321a0f302707ec42aa3" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "grants" ADD CONSTRAINT "FK_c1011b4ad00a02ac97dc0d06916" FOREIGN KEY ("granter_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "grants" DROP CONSTRAINT "FK_c1011b4ad00a02ac97dc0d06916"`,
    );
    await queryRunner.query(
      `ALTER TABLE "grants" DROP CONSTRAINT "FK_501eb48e321a0f302707ec42aa3"`,
    );
    await queryRunner.query(`DROP TABLE "grants"`);
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "second_name" TO "column_name"`,
    );
  }
}
