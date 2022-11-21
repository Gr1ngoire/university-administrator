import { MigrationInterface, QueryRunner } from 'typeorm';

export class initialMigration1669067291277 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
