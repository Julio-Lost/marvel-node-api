import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('UserCharacter')
export class UserCharacterEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	characterId: string;

	@Column()
	name: string;

	@Column({ type: 'text' })
	description: string;

	@Column()
	thumbnailUrl: string;

	@Column()
	detailUrl: string;

	@Column()
	userId: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}
