import { Router } from 'express';

import UserRoutes from './user/User.routes';
import ComicRoutes from './comic/Comic.routes';
import CharacterRoutes from './character/Character.routes';

const router = Router();

router.use('/user', UserRoutes);
router.use('/comic', ComicRoutes);
router.use('/character', CharacterRoutes);

export default router;
