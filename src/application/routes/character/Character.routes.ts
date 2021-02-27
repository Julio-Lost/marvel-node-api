import { CharacterController } from '../../controllers/character/CharacterController';
import { Router } from 'express';

const characterRouter = Router();
const characterController = new CharacterController();

characterRouter.post('/', characterController.getCharacters);
characterRouter.post('/:characterId/comics', characterController.getCharacterComicInfo);

export default characterRouter;
