import { responseTreated } from '@shared/useful/httpHelper';
import { NextFunction, Request, Response } from 'express';
import { UserServiceApplication } from '../../services/UserServiceApplication';
import {
	addCharacterScheme,
	addComicScheme,
	createUserSchema,
	removeCharacterScheme,
	removeComicScheme,
	sessionSchema,
	updateSchema,
	userIdScheme,
} from './scheme';

export class UserController {
	async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			await createUserSchema.validateAsync(req.body);
			const userServiceApplication = new UserServiceApplication();

			const result = await userServiceApplication.createUser(req.body);
			responseTreated(result, res);
		} catch (error) {
			if (error.isJoi === true) {
				res.status(422).json(error);
			} else {
				next(error);
			}
		}
	}
	async session(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			await sessionSchema.validateAsync(req.body);
			const userServiceApplication = new UserServiceApplication();

			const { email, password } = req.body;

			const result = await userServiceApplication.session(email, password);
			responseTreated(result, res);
		} catch (error) {
			if (error.isJoi === true) {
				res.status(422).json(error);
			} else {
				next(error);
			}
		}
	}
	async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			await updateSchema.validateAsync(req.body);
			const userServiceApplication = new UserServiceApplication();

			const result = await userServiceApplication.updateUser(req.body);
			responseTreated(result, res);
		} catch (error) {
			if (error.isJoi === true) {
				res.status(422).json(error);
			} else {
				next(error);
			}
		}
	}
	async addFavoriteCharacter(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			await addCharacterScheme.validateAsync(req.body);
			const userServiceApplication = new UserServiceApplication();

			const result = await userServiceApplication.addCharacterFavorite(req.body);
			responseTreated(result, res);
		} catch (error) {
			if (error.isJoi === true) {
				res.status(422).json(error);
			} else {
				next(error);
			}
		}
	}
	async addFavoriteComic(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			await addComicScheme.validateAsync(req.body);
			const userServiceApplication = new UserServiceApplication();

			const result = await userServiceApplication.addComicFavorite(req.body);
			responseTreated(result, res);
		} catch (error) {
			if (error.isJoi === true) {
				res.status(422).json(error);
			} else {
				next(error);
			}
		}
	}
	async removeFavoriteCharacter(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			await removeCharacterScheme.validateAsync(req.body);
			const userServiceApplication = new UserServiceApplication();
			const { characterId, userId } = req.body;
			const result = await userServiceApplication.removeCharacterFavorite(characterId, userId);

			responseTreated(result, res);
		} catch (error) {
			if (error.isJoi === true) {
				res.status(422).json(error);
			} else {
				next(error);
			}
		}
	}
	async removeFavoriteComic(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			await removeComicScheme.validateAsync(req.body);
			const userServiceApplication = new UserServiceApplication();
			const { comicId, userId } = req.body;
			const result = await userServiceApplication.removeComicFavorite(comicId, userId);

			responseTreated(result, res);
		} catch (error) {
			if (error.isJoi === true) {
				res.status(422).json(error);
			} else {
				next(error);
			}
		}
	}
	async getFavoriteCharacters(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			await userIdScheme.validateAsync(req.params);

			const userServiceApplication = new UserServiceApplication();

			const { userId } = req.params;
			const result = await userServiceApplication.getCharactersFavorite(userId);

			responseTreated(result, res);
		} catch (error) {
			if (error.isJoi === true) {
				res.status(422).json(error);
			} else {
				next(error);
			}
		}
	}
	async getFavoriteComics(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			await userIdScheme.validateAsync(req.params);

			const userServiceApplication = new UserServiceApplication();

			const { userId } = req.params;
			const result = await userServiceApplication.getComicsFavorite(userId);

			responseTreated(result, res);
		} catch (error) {
			if (error.isJoi === true) {
				res.status(422).json(error);
			} else {
				next(error);
			}
		}
	}
}
