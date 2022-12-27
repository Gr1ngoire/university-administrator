import { MigrationInterface, QueryRunner } from 'typeorm';

export class createFaqMessagesTable1672152126611 implements MigrationInterface {
  name = 'createFaqMessagesTable1672152126611';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "faq" ("id" SERIAL NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "message" character varying NOT NULL, "author_id" integer NOT NULL, CONSTRAINT "PK_d6f5a52b1a96dd8d0591f9fbc47" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "faq" ADD CONSTRAINT "FK_3f2abc8c73e633645430b1993ff" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "faq" DROP CONSTRAINT "FK_3f2abc8c73e633645430b1993ff"`,
    );
    await queryRunner.query(`DROP TABLE "faq"`);
  }
}
