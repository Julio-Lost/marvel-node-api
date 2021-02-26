import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateUserCharacter1613048018316 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'UserCharacter',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
						generationStrategy: 'uuid',
						default: 'uuid_generate_v4()',
					},
					{
						name: 'characterId',
						type: 'varchar',
					},
					{
						name: 'name',
						type: 'varchar',
					},
					{
						name: 'description',
						type: 'text',
						isNullable: true,
					},
					{
						name: 'thumbnailUrl',
						type: 'varchar',
						isNullable: true,
					},
					{
						name: 'detailUrl',
						type: 'varchar',
						isNullable: true,
					},
					{
						name: 'userId',
						type: 'uuid',
					},
					{
						name: 'created_at',
						type: 'timestamp',
						default: 'now()',
					},
					{
						name: 'updated_at',
						type: 'timestamp',
						default: 'now()',
					},
				],
			})
		);

		await queryRunner.createForeignKey(
			'UserCharacter',
			new TableForeignKey({
				name: 'UserCharacter_FK',
				columnNames: ['userId'],
				referencedTableName: 'User',
				referencedColumnNames: ['id'],
				onDelete: 'SET NULL',
				onUpdate: 'CASCADE',
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('UserCharacter', 'UserCharacter_FK');

		await queryRunner.dropTable('UserCharacter');
	}
}
