import { Router } from 'express';
import { ComicController } from '@application/controllers/comic/ComicController';

const comicRouter = Router();
const comicController = new ComicController();

comicRouter.post('/', comicController.getComics);
comicRouter.post('/:comicId/characters', comicController.getComicCharacterInfo);

export default comicRouter;
