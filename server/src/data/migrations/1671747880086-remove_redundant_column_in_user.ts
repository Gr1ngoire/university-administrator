import { MigrationInterface, QueryRunner } from 'typeorm';

export class removeRedundantColumnInUser1671747880086
  implements MigrationInterface
{
  name = 'removeRedundantColumnInUser1671747880086';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."users_role_enum" AS ENUM('student', 'teacher')`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "role" "public"."users_role_enum" NOT NULL DEFAULT 'student'`,
    );
  }
}
