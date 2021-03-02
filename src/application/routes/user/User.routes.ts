import { Router } from 'express';
import { UserController } from '../../controllers/user/UserController';

const userRouter = Router();
const userController = new UserController();

userRouter.post('/session', userController.session);
userRouter.post('/create-user', userController.createUser);
userRouter.post('/update-user', userController.updateUser);
userRouter.post('/add-favorite-comic', userController.addFavoriteComic);
userRouter.post('/add-favorite-character', userController.addFavoriteCharacter);
userRouter.post('/remove-favorite-comic', userController.removeFavoriteComic);
userRouter.post('/remove-favorite-character', userController.removeFavoriteCharacter);
userRouter.get('/:userId/favorites-comics', userController.getFavoriteComics);
userRouter.get('/:userId/favorites-characters', userController.getFavoriteCharacters);

export default userRouter;
