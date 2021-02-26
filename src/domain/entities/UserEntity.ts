import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { UserCharacterEntity } from './UserCharacterEntity';
import { UserComicEntity } from './UserComicEntity';

@Entity('User')
export class UserEntity extends BaseEntity {
	@Column()
	name: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@OneToMany(() => UserCharacterEntity, (character) => character.user)
	characters: UserCharacterEntity[];

	@OneToMany(() => UserComicEntity, (comic) => comic.user)
	comics: UserComicEntity[];
}
