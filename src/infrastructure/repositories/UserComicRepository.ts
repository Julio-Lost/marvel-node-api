import { DeleteResult, EntityRepository, Repository } from 'typeorm';

import ICreateUserComicDTO from '@domain/dtos/ICreateUserComicDTO';
import { UserComicEntity } from '@domain/entities/UserComicEntity';
import IUserComicRepository from '@domain/repositories/IUserComicRepository';

@EntityRepository(UserComicEntity)
class UserComicRepository extends Repository<UserComicEntity> implements IUserComicRepository {
	public async findById(userComicId: string): Promise<UserComicEntity | undefined> {
		const userComic = await this.findOne(userComicId);

		return userComic;
	}

	public async createUserComic(data: ICreateUserComicDTO): Promise<UserComicEntity> {
		const { comicId, userId, title, description, detailUrl, thumbnailUrl } = data;
		const userComic = this.create({
			comicId,
			userId,
			title,
			description,
			detailUrl,
			thumbnailUrl,
		});

		await this.save(userComic);

		return userComic;
	}

	public async deleteUserComic(comicId: string, userId: string): Promise<DeleteResult> {
		const response = await this.delete({ comicId: comicId, userId: userId });
		return response;
	}
}

export default UserComicRepository;
