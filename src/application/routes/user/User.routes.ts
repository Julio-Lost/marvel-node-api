import { Router } from 'express';
import { UserController } from '@application/controllers/user/UserController';

const userRouter = Router();
const userController = new UserController();

userRouter.post('/session', userController.session);
userRouter.post('/create-user', userController.createUser);
userRouter.post('/update-user', userController.updateUser);
userRouter.post('/add-favorite-character', userController.addFavoriteCharacter);
userRouter.post('/add-favorite-comic', userController.addFavoriteComic);
userRouter.post('/remove-favorite-character', userController.removeFavoriteCharacter);
userRouter.post('/remove-favorite-comic', userController.removeFavoriteComic);
userRouter.get('/:userId/favorites-comics', userController.getFavoriteCharacters);
userRouter.get('/:userId/favorites-characters', userController.getFavoriteComics);

export default userRouter;
