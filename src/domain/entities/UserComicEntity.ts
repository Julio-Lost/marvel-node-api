import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { UserEntity } from './UserEntity';

@Entity('UserComic')
export class UserComicEntity extends BaseEntity {
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

	@ManyToOne(() => UserEntity, (user) => user.comics)
	@JoinColumn({ name: 'userId' })
	user: UserEntity;
}
