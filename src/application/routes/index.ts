import { Router } from 'express';

import UserRoutes from '@application/routes/user/User.routes';
import ComicRoutes from '@application/routes/comic/Comic.routes';
import CharacterRoutes from '@application/routes/character/Character.routes';

const router = Router();

router.use('/user', UserRoutes);
router.use('/comic', ComicRoutes);
router.use('/character', CharacterRoutes);

export default router;
