import { MigrationInterface, QueryRunner } from 'typeorm';

export class newsTableMakeImgUrlNullable1669663218716
  implements MigrationInterface
{
  name = 'newsTableMakeImgUrlNullable1669663218716';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "news" ALTER COLUMN "img_url" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "news" ALTER COLUMN "img_url" SET NOT NULL`,
    );
  }
}
