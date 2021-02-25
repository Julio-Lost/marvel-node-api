import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { UserCharacterEntity } from './UserCharacterEntity';
import { UserComicEntity } from './UserComicEntity';

@Entity('User')
export class UserEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@OneToMany(() => UserCharacterEntity, (character) => character.user)
	characters: UserCharacterEntity[];

	@OneToMany(() => UserComicEntity, (comic) => comic.user)
	comics: UserComicEntity[];
}
