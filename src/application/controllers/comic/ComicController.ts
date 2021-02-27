import { ComicServiceApplication } from '../../services/ComicServiceApplication';
import { responseTreated } from '../../../shared/useful/httpHelper';
import { NextFunction, Request, Response } from 'express';
import { getComicCharacterScheme, getComicsScheme } from './scheme';

export class ComicController {
	async getComics(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			await getComicsScheme.validateAsync(req.body);
			const comicServiceApplication = new ComicServiceApplication();
			const { userId, searchParameter } = req.body;

			const result = await comicServiceApplication.getComics(userId, searchParameter);
			responseTreated(result, res);
		} catch (error) {
			if (error.isJoi === true) {
				res.status(422).json(error);
			} else {
				next(error);
			}
		}
	}

	async getComicCharacterInfo(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { comicId } = req.params;
			const { userId } = req.body;
			await getComicCharacterScheme.validateAsync(req.body);

			const comicServiceApplication = new ComicServiceApplication();

			const result = await comicServiceApplication.getComicCharacterInfo(comicId, userId);
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
