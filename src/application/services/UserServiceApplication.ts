import { getCustomRepository } from 'typeorm';
import ICreateUserCharacterDTO from '@domain/dtos/ICreateUserCharacterDTO';
import ICreateUserComicDTO from '@domain/dtos/ICreateUserComicDTO';
import ICreateUserDTO from '@domain/dtos/ICreateUserDTO';
import IUpdateUserDTO from '@domain/dtos/IUpdateUserDTO';
import UserCharacterRepository from '@infra/repositories/UserCharacterRepository';
import UserComicRepository from '@infra/repositories/UserComicRepository';
import UserRepository from '@infra/repositories/UserRepository';
import { emailError, genericError, HttpResponse, ok, serverError, userNotExistError } from '@shared/useful/httpHelper';
import { tokenGenerator } from '@shared/useful/jwt';
import bcrypt from 'bcrypt';
import IUserServiceApplication from '@application/services/Interfaces/IUserServiceApplication';

export class UserServiceApplication implements IUserServiceApplication {
	public async createUser(data: ICreateUserDTO): Promise<HttpResponse> {
		try {
			const userRepository = getCustomRepository(UserRepository);

			const newDataUserEmail = data.email;
			let newDataUserPassword = data.password;

			const userCheckEmail = await userRepository.findByEmail(newDataUserEmail);

			const emailExisting = userCheckEmail !== undefined;
			if (emailExisting) {
				return emailError();
			}

			newDataUserPassword = await bcrypt.hash(newDataUserPassword, 10);

			const response = await userRepository.createUser({
				email: newDataUserEmail,
				name: data.name,
				password: newDataUserPassword,
			});

			response.password = '';

			const body = response;
			const message = 'Created user with success.';

			return ok(body, message);
		} catch (error) {
			return serverError(error);
		}
	}
	public async session(email: string, password: string): Promise<HttpResponse> {
		try {
			const userRepository = getCustomRepository(UserRepository);

			const user = await userRepository.findByEmail(email);

			const userNotExist = user === undefined;
			if (userNotExist) {
				return userNotExistError();
			}

			const userPassword = user!.password;
			const comparePassword = await bcrypt.compare(password, userPassword);

			const differentPasswords = !comparePassword;
			if (differentPasswords) {
				return genericError({}, 400, 'Incorrect password');
			}

			const userName = user?.name;
			const userId = user!.id;
			const token = tokenGenerator(userId);

			const response = {
				id: user?.id,
				email,
				userName,
				token,
			};
			const messageSuccess = 'Session created with success.';

			return ok(response, messageSuccess);
		} catch (error) {
			return serverError(error);
		}
	}
	public async updateUser(data: IUpdateUserDTO): Promise<HttpResponse> {
		try {
			const userRepository = getCustomRepository(UserRepository);

			const userId = data.id;
			const newEmailUser = data.email;
			let newPasswordUser = data.password;
			const oldPassword = data.oldPassword;

			const userOld = await userRepository.findById(userId);

			const userNotExist = userOld === undefined;
			if (userNotExist) {
				return userNotExistError();
			}

			const differentEmail = userOld?.email !== newEmailUser;

			if (differentEmail) {
				const userCheckEmail = await userRepository.findByEmail(newEmailUser);

				const emailExisting = userCheckEmail !== undefined;
				if (emailExisting) {
					return emailError();
				}
			}

			const newPasswordNotSent = !newPasswordUser;
			const oldPasswordNotSent = !oldPassword;

			if (oldPasswordNotSent && newPasswordNotSent) {
				await userRepository.updateUser({
					email: newEmailUser,
					name: data.name,
					id: userId,
					password: userOld!.password,
				});
			} else {
				if (oldPassword && newPasswordNotSent) {
					return genericError({}, 400, 'Old password not sent.');
				} else {
					const equalPasswords = await bcrypt.compare(oldPassword, userOld!.password);

					if (equalPasswords) {
						newPasswordUser = await bcrypt.hash(newPasswordUser, 10);

						await userRepository.updateUser({
							email: newEmailUser,
							name: data.name,
							id: userId,
							password: newPasswordUser,
						});
					} else {
						return genericError({}, 405, 'Incorrect old password');
					}
				}
			}

			const body = {};
			const messageSuccess = 'Update user with success.';

			return ok(body, messageSuccess);
		} catch (error) {
			return serverError(error);
		}
	}
	public async addCharacterFavorite(data: ICreateUserCharacterDTO): Promise<HttpResponse> {
		try {
			const userCharacterRepository = getCustomRepository(UserCharacterRepository);

			const response = await userCharacterRepository.createUserCharacter(data);
			const messageSuccess = 'Added character with success.';
			const body = response;

			return ok(body, messageSuccess);
		} catch (error) {
			return serverError(error);
		}
	}
	public async addComicFavorite(data: ICreateUserComicDTO): Promise<HttpResponse> {
		try {
			const userComicRepository = getCustomRepository(UserComicRepository);

			const response = await userComicRepository.createUserComic(data);
			const messageSuccess = 'Added comic with success.';
			const body = response;

			return ok(body, messageSuccess);
		} catch (error) {
			return serverError(error);
		}
	}
	public async removeCharacterFavorite(characterId: string, userId: string): Promise<HttpResponse> {
		try {
			const userCharacterRepository = getCustomRepository(UserCharacterRepository);

			await userCharacterRepository.deleteUserCharacter(characterId, userId);
			const messageSuccess = 'Deleted character with success.';
			const body = {};

			return ok(body, messageSuccess);
		} catch (error) {
			return serverError(error);
		}
	}
	public async removeComicFavorite(comicId: string, userId: string): Promise<HttpResponse> {
		try {
			const userComicRepository = getCustomRepository(UserComicRepository);

			await userComicRepository.deleteUserComic(comicId, userId);
			const messageSuccess = 'Deleted comic with success.';
			const body = {};

			return ok(body, messageSuccess);
		} catch (error) {
			return serverError(error);
		}
	}
	public async getCharactersFavorite(userId: string): Promise<HttpResponse> {
		try {
			const userCharacterRepository = getCustomRepository(UserCharacterRepository);

			const charactersFavorites = await userCharacterRepository.find({ where: { userId } });

			const messageSuccess = 'Characters favorites obtained successfully.';
			const body = charactersFavorites;

			return ok(body, messageSuccess);
		} catch (error) {
			return serverError(error);
		}
	}
	public async getComicsFavorite(userId: string): Promise<HttpResponse> {
		try {
			const userComicRepository = getCustomRepository(UserComicRepository);

			const comicsFavorites = await userComicRepository.find({ where: { userId } });

			const messageSuccess = 'Comics favorites obtained successfully.';
			const body = comicsFavorites;

			return ok(body, messageSuccess);
		} catch (error) {
			return serverError(error);
		}
	}
}
