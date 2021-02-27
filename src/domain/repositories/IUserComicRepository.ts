import { DeleteResult } from 'typeorm';

import ICreateUserComicDTO from '../dtos/ICreateUserComicDTO';
import { UserComicEntity } from '../entities/UserComicEntity';

export default interface IUserComicRepository {
	createUserComic(data: ICreateUserComicDTO): Promise<UserComicEntity>;
	deleteUserComic(comicId: string, userId: string): Promise<DeleteResult>;
	findById(userComicId: string): Promise<UserComicEntity | undefined>;
}
