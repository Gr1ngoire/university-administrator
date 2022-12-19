import { MigrationInterface, QueryRunner } from 'typeorm';

export class studentsAndTeachersTablesReformationAddUsersTable1671450657955
  implements MigrationInterface
{
  name = 'studentsAndTeachersTablesReformationAddUsersTable1671450657955';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "departments" DROP CONSTRAINT "FK_0f481340d0ba8db6ca9307180cf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "groups" DROP CONSTRAINT "FK_f469c5432c719b0bbb668010ddb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedules" DROP CONSTRAINT "FK_cfacddd81efeda13acadb93d42b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedules" DROP CONSTRAINT "FK_d34a116263ef343caa16eab3a3b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedules" DROP CONSTRAINT "FK_b9579e4a3a46e2afdae0b757048"`,
    );
    await queryRunner.query(
      `ALTER TABLE "students" DROP CONSTRAINT "FK_1bd5a468c54488b86d50a117f15"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_role_enum" AS ENUM('student', 'teacher')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "name" character varying NOT NULL, "surname" character varying NOT NULL, "column_name" character varying NOT NULL, "phone" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'student', "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "students" DROP CONSTRAINT "UQ_a56c051c91dbe1068ad683f536e"`,
    );
    await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "email"`);
    await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "phone"`);
    await queryRunner.query(`ALTER TABLE "teachers" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "teachers" DROP COLUMN "surname"`);
    await queryRunner.query(
      `ALTER TABLE "teachers" DROP CONSTRAINT "UQ_00634394dce7677d531749ed8e8"`,
    );
    await queryRunner.query(`ALTER TABLE "teachers" DROP COLUMN "email"`);
    await queryRunner.query(`ALTER TABLE "teachers" DROP COLUMN "phone"`);
    await queryRunner.query(
      `ALTER TABLE "students" ADD "user_id" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "students" ADD CONSTRAINT "UQ_fb3eff90b11bddf7285f9b4e281" UNIQUE ("user_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "teachers" ADD "user_id" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "teachers" ADD CONSTRAINT "UQ_4668d4752e6766682d1be0b346f" UNIQUE ("user_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "teachers" ADD "department_id" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "departments" ALTER COLUMN "faculty_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "groups" ALTER COLUMN "department_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedules" ALTER COLUMN "teacher_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedules" ALTER COLUMN "discipline_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedules" ALTER COLUMN "group_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "students" ALTER COLUMN "group_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "departments" ADD CONSTRAINT "FK_db9cbab5eb895126fc1689dc2ad" FOREIGN KEY ("faculty_id") REFERENCES "faculties"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "groups" ADD CONSTRAINT "FK_59a5caf58073e782a8ee5138be7" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedules" ADD CONSTRAINT "FK_2c027020a88187efddd0dbb8421" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedules" ADD CONSTRAINT "FK_7e0c356ae2be649f38785b25e70" FOREIGN KEY ("discipline_id") REFERENCES "disciplines"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedules" ADD CONSTRAINT "FK_330dc11fecc87ead6c8464d9552" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "students" ADD CONSTRAINT "FK_fb3eff90b11bddf7285f9b4e281" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "students" ADD CONSTRAINT "FK_b9f6fcd8a397ee5b503191dd7c3" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "teachers" ADD CONSTRAINT "FK_4668d4752e6766682d1be0b346f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "teachers" ADD CONSTRAINT "FK_d95e08718b761696a377d0fcabf" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "teachers" DROP CONSTRAINT "FK_d95e08718b761696a377d0fcabf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "teachers" DROP CONSTRAINT "FK_4668d4752e6766682d1be0b346f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "students" DROP CONSTRAINT "FK_b9f6fcd8a397ee5b503191dd7c3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "students" DROP CONSTRAINT "FK_fb3eff90b11bddf7285f9b4e281"`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedules" DROP CONSTRAINT "FK_330dc11fecc87ead6c8464d9552"`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedules" DROP CONSTRAINT "FK_7e0c356ae2be649f38785b25e70"`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedules" DROP CONSTRAINT "FK_2c027020a88187efddd0dbb8421"`,
    );
    await queryRunner.query(
      `ALTER TABLE "groups" DROP CONSTRAINT "FK_59a5caf58073e782a8ee5138be7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "departments" DROP CONSTRAINT "FK_db9cbab5eb895126fc1689dc2ad"`,
    );
    await queryRunner.query(
      `ALTER TABLE "students" ALTER COLUMN "group_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedules" ALTER COLUMN "group_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedules" ALTER COLUMN "discipline_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedules" ALTER COLUMN "teacher_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "groups" ALTER COLUMN "department_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "departments" ALTER COLUMN "faculty_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "teachers" DROP COLUMN "department_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "teachers" DROP CONSTRAINT "UQ_4668d4752e6766682d1be0b346f"`,
    );
    await queryRunner.query(`ALTER TABLE "teachers" DROP COLUMN "user_id"`);
    await queryRunner.query(
      `ALTER TABLE "students" DROP CONSTRAINT "UQ_fb3eff90b11bddf7285f9b4e281"`,
    );
    await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "user_id"`);
    await queryRunner.query(
      `ALTER TABLE "teachers" ADD "phone" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "teachers" ADD "email" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "teachers" ADD CONSTRAINT "UQ_00634394dce7677d531749ed8e8" UNIQUE ("email")`,
    );
    await queryRunner.query(
      `ALTER TABLE "teachers" ADD "surname" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "teachers" ADD "name" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "students" ADD "phone" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "students" ADD "email" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "students" ADD CONSTRAINT "UQ_a56c051c91dbe1068ad683f536e" UNIQUE ("email")`,
    );
    await queryRunner.query(
      `ALTER TABLE "students" ADD "name" character varying NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    await queryRunner.query(
      `ALTER TABLE "students" ADD CONSTRAINT "FK_1bd5a468c54488b86d50a117f15" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedules" ADD CONSTRAINT "FK_b9579e4a3a46e2afdae0b757048" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedules" ADD CONSTRAINT "FK_d34a116263ef343caa16eab3a3b" FOREIGN KEY ("discipline_id") REFERENCES "disciplines"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedules" ADD CONSTRAINT "FK_cfacddd81efeda13acadb93d42b" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "groups" ADD CONSTRAINT "FK_f469c5432c719b0bbb668010ddb" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "departments" ADD CONSTRAINT "FK_0f481340d0ba8db6ca9307180cf" FOREIGN KEY ("faculty_id") REFERENCES "faculties"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
