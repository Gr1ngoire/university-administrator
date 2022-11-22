import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

const TABLE_NAME = 'disciplines';

enum ColumnsNames {
  ID = 'id',
  UPDATED_AT = 'updated_at',
  CREATED_AT = 'created_at',
  NAME = 'name',
}

export class createDisciplinesTable1669069550486 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const disciplinesTable = new Table({
      name: TABLE_NAME,
    });
    const disciplinesTableColumns: TableColumn[] = [];
    await queryRunner.createTable(disciplinesTable);
    await queryRunner.addColumns(TABLE_NAME, disciplinesTableColumns);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
