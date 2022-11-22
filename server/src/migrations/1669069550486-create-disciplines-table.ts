import { DbTablesColumnsName, DbTablesNames } from 'src/common/enums/enums';
import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

export class createDisciplinesTable1669069550486 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const disciplinesTable = new Table({
      name: DbTablesNames.DISCIPLINES,
    });
    const disciplinesTableColumns: TableColumn[] = [
      {
        isPrimary: true,
        isGenerated: false,
        isNullable: false,
        isUnique: true,
        isArray: false,
        name: DbTablesColumnsName.ID,
        type: '',
      },
    ];
    await queryRunner.createTable(disciplinesTable);
    await queryRunner.addColumns(
      DbTablesNames.DISCIPLINES,
      disciplinesTableColumns,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
