import { MigrationInterface, QueryRunner } from 'typeorm';

export class dropNameColumnInSchedules1671119297967
  implements MigrationInterface
{
  name = 'dropNameColumnInSchedules1671119297967';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "name"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "schedules" ADD "name" character varying NOT NULL`,
    );
  }
}
