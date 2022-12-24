import { MigrationInterface, QueryRunner } from 'typeorm';

export class makeGranterColumnNullable1671900097914
  implements MigrationInterface
{
  name = 'makeGranterColumnNullable1671900097914';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."grants_grant_enum" AS ENUM('admin', 'user')`,
    );
    await queryRunner.query(
      `ALTER TABLE "grants" ADD "grant" "public"."grants_grant_enum" NOT NULL DEFAULT 'user'`,
    );
    await queryRunner.query(
      `ALTER TABLE "grants" DROP CONSTRAINT "FK_c1011b4ad00a02ac97dc0d06916"`,
    );
    await queryRunner.query(
      `ALTER TABLE "grants" ALTER COLUMN "granter_id" DROP NOT NULL`,
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
      `ALTER TABLE "grants" ALTER COLUMN "granter_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "grants" ADD CONSTRAINT "FK_c1011b4ad00a02ac97dc0d06916" FOREIGN KEY ("granter_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "grants" DROP COLUMN "grant"`);
    await queryRunner.query(`DROP TYPE "public"."grants_grant_enum"`);
  }
}
