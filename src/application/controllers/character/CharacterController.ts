import { CharacterServiceApplication } from '../../services/CharacterServiceApplication';
import { responseTreated } from '../../../shared/useful/httpHelper';
import { NextFunction, Request, Response } from 'express';
import { getCharactersScheme, getComicsOfCharacterScheme } from './scheme';

export class CharacterController {
	async getCharacters(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			await getCharactersScheme.validateAsync(req.body);
			const comicServiceApplication = new CharacterServiceApplication();
			const { userId, searchParameter } = req.body;

			const result = await comicServiceApplication.getCharacters(userId, searchParameter);
			responseTreated(result, res);
		} catch (error) {
			if (error.isJoi === true) {
				res.status(422).json(error);
			} else {
				next(error);
			}
		}
	}

	async getCharacterComicInfo(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { characterId } = req.params;
			const { userId } = req.body;
			await getComicsOfCharacterScheme.validateAsync(req.body);

			const comicServiceApplication = new CharacterServiceApplication();

			const result = await comicServiceApplication.getCharacterComicInfo(characterId, userId);
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
