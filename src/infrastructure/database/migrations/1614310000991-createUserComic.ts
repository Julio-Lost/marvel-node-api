import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateUserComic1613048025509 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'UserComic',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
						generationStrategy: 'uuid',
						default: 'uuid_generate_v4()',
					},
					{
						name: 'comicId',
						type: 'varchar',
					},
					{
						name: 'title',
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
			'UserComic',
			new TableForeignKey({
				name: 'UserComic_FK',
				columnNames: ['userId'],
				referencedTableName: 'User',
				referencedColumnNames: ['id'],
				onDelete: 'SET NULL',
				onUpdate: 'CASCADE',
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('UserComic', 'UserComic_FK');

		await queryRunner.dropTable('UserComic');
	}
}
