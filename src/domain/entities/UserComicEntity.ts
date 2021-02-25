import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('UserComic')
export class UserComicEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	comicId: string;

	@Column()
	title: string;

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
