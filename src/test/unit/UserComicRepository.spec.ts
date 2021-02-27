import { getCustomRepository } from 'typeorm';
import UserComicRepository from '../../infrastructure/repositories/UserComicRepository';
import UserRepository from '../../infrastructure/repositories/UserRepository';
import ICreateUserComicDTO from '../../domain/dtos/ICreateUserComicDTO';
import ICreateUserDTO from '../../domain/dtos/ICreateUserDTO';

describe('UserComicRepository unit test', () => {
	it('Should_Create_User_Comic_In_The_Database', async () => {
		//Given
		const userRepository = getCustomRepository(UserRepository);

		const userDto: ICreateUserDTO = {
			email: 'testesilvacreateusercomic@mail.com',
			name: 'Teste Silva',
			password: 'teste',
		};
		const user = await userRepository.createUser(userDto);
		const userId = user.id;

		const userComicRepository = getCustomRepository(UserComicRepository);

		const userComicDto: ICreateUserComicDTO = {
			userId,
			comicId: '123456789',
			title: 'Comic Novel Marvel',
			description: 'Uma descricao marvel',
			detailUrl: 'http://teste.com',
			thumbnailUrl: 'http://teste.com',
		};

		//When
		const userComic = await userComicRepository.createUserComic(userComicDto);

		//Then
		expect(userComic.comicId).toBe(userComicDto.comicId);
	});

	it('Should_Delete_User_Comic_In_The_Database', async () => {
		//Given
		const userRepository = getCustomRepository(UserRepository);

		const userDto: ICreateUserDTO = {
			email: 'testdeleteusercomic@mail.com',
			name: 'Teste Silva',
			password: 'teste',
		};
		const user = await userRepository.createUser(userDto);
		const userId = user.id;

		const userComicRepository = getCustomRepository(UserComicRepository);

		const userComicDto: ICreateUserComicDTO = {
			userId,
			comicId: '123456789',
			title: 'Comic Novel Marvel',
			description: 'Uma descricao marvel',
			detailUrl: 'http://teste.com',
			thumbnailUrl: 'http://teste.com',
		};
		const userComic = await userComicRepository.createUserComic(userComicDto);
		const comicId = userComicDto.comicId;
		const userComicId = userComic.id;

		//When
		await userComicRepository.deleteUserComic(comicId, userId);
		const response = await userComicRepository.findById(userComicId);

		//Then
		expect(response).toBeUndefined();
	});
});
