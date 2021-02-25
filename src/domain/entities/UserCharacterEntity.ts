import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	JoinColumn,
} from 'typeorm';
import { UserEntity } from './UserEntity';

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

	@ManyToOne(() => UserEntity, (user) => user.characters)
	@JoinColumn({ name: 'userId' })
	user: UserEntity;
}
