import { getCustomRepository } from 'typeorm';
import ICreateUserDTO from '../../domain/dtos/ICreateUserDTO';
import IUpdateUserDTO from '../../domain/dtos/IUpdateUserDTO';
import UserRepository from '../../infrastructure/repositories/UserRepository';

describe('UserRepository unit tests', () => {
	it('Should_Create_User_In_The_Database', async () => {
		//Given
		const userRepository = getCustomRepository(UserRepository);

		const userDto: ICreateUserDTO = {
			email: 'test@mail.com',
			name: 'Teste Silva',
			password: 'teste',
		};

		//When
		const user = await userRepository.createUser(userDto);

		//Then
		expect(user.name).toBe(userDto.name);
		expect(user.email).toBe(userDto.email);
		expect(user.password).toBe(userDto.password);
	});

	it('Should_Update_User_In_The_Database', async () => {
		//Given
		const userRepository = getCustomRepository(UserRepository);

		const userDto: ICreateUserDTO = {
			email: 'testupdateUser@mail.com',
			name: 'Teste Silva',
			password: 'teste',
		};
		const user = await userRepository.createUser(userDto);
		const userId = user.id;

		const userUpdateDto: Omit<IUpdateUserDTO, 'oldPassword'> = {
			id: userId,
			name: 'Teste Silva',
			email: 'newtest@mail.com',
			password: 'teste',
		};

		//When
		await userRepository.updateUser(userUpdateDto);
		const userUpdated = await userRepository.findById(userId);

		//Then
		expect(userUpdated?.email).toBe(userUpdateDto.email);
		expect(userUpdated?.name).toBe(userUpdateDto.name);
	});

	it('Should_Find_User_By_Email_In_Database', async () => {
		//Given
		const userRepository = getCustomRepository(UserRepository);

		const userDto: ICreateUserDTO = {
			email: 'testfindUser@gmail.com',
			name: 'Teste Silva',
			password: 'teste',
		};
		const user = await userRepository.createUser(userDto);
		const userEmail = user.email;

		//When
		const userFound = await userRepository.findByEmail(userEmail);

		//Then
		expect(userFound?.email).toBe(userEmail);
	});
});
