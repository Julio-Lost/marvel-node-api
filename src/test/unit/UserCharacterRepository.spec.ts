import { getCustomRepository } from 'typeorm';
import ICreateUserCharacterDTO from '@domain/dtos/ICreateUserCharacterDTO';
import ICreateUserDTO from '@domain/dtos/ICreateUserDTO';
import UserCharacterRepository from '@infra/repositories/UserCharacterRepository';
import UserRepository from '@infra/repositories/UserRepository';

describe('UserCharacterRepository unit test', () => {
	it('Should_Create_User_Character_In_The_Database', async () => {
		//Given
		const userRepository = getCustomRepository(UserRepository);

		const userDto: ICreateUserDTO = {
			email: 'testcreateusercharacter@mail.com',
			name: 'Vinicius Batista',
			password: '123456',
		};
		const user = await userRepository.createUser(userDto);
		const userId = user.id;

		const userCharacterRepository = getCustomRepository(UserCharacterRepository);

		const userCharacterDto: ICreateUserCharacterDTO = {
			userId,
			characterId: '123456789',
			name: 'Spider',
			description: 'O spider-man é o amigão da vizinhança',
			detailUrl: 'http://teste.com',
			thumbnailUrl: 'http://teste.com',
		};

		//When
		const userCharacter = await userCharacterRepository.createUserCharacter(userCharacterDto);

		//Then
		expect(userCharacter.characterId).toBe(userCharacterDto.characterId);
	});

	it('Should_Delete_User_Character_In_The_Database', async () => {
		//Given
		const userRepository = getCustomRepository(UserRepository);

		const userDto: ICreateUserDTO = {
			email: 'testdeleteusercharacter@mail.com',
			name: 'Teste Silva',
			password: 'teste',
		};
		const user = await userRepository.createUser(userDto);
		const userId = user.id;

		const userCharacterRepository = getCustomRepository(UserCharacterRepository);

		const userCharacterDto: ICreateUserCharacterDTO = {
			userId,
			characterId: '123456789',
			name: 'Spider',
			description: 'O spider-man é o amigão da vizinhança',
			detailUrl: 'http://teste.com',
			thumbnailUrl: 'http://teste.com',
		};
		const userCharacter = await userCharacterRepository.createUserCharacter(userCharacterDto);
		const characterId = userCharacterDto.characterId;
		const userCharacterId = userCharacter.id;

		//When
		await userCharacterRepository.deleteUserCharacter(characterId, userId);
		const response = await userCharacterRepository.findById(userCharacterId);

		//Then
		expect(response).toBeUndefined();
	});
});
