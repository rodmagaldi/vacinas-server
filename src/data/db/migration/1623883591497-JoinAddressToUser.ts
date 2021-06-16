import { MigrationInterface, QueryRunner, TableForeignKey, TableColumn } from 'typeorm';

export class JoinAddressToUser1623883591497 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'addressId',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'users',
      new TableForeignKey({
        columnNames: ['addressId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'addresses',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('users');
    const foreignKey = table.foreignKeys.find((fk) => fk.columnNames.indexOf('addressId') !== -1);
    await queryRunner.dropForeignKey('users', foreignKey);
    await queryRunner.dropColumn('users', 'addressId');
  }
}
