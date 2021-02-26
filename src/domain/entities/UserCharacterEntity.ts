import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	JoinColumn,
} from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { UserEntity } from './UserEntity';

@Entity('UserCharacter')
export class UserCharacterEntity extends BaseEntity {
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

	@ManyToOne(() => UserEntity, (user) => user.characters)
	@JoinColumn({ name: 'userId' })
	user: UserEntity;
}
