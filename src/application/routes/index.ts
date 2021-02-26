import { Router } from 'express';

import UserRoutes from '@application/routes/user/User.routes';
import ComicRoutes from '@application/routes/comic/Comic.routes';

const router = Router();

router.use('/user', UserRoutes);
router.use('/comic', ComicRoutes);

export default router;
