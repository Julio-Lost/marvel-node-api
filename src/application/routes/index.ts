import { Router } from 'express';

import UserRoutes from '@application/routes/user/User.routes';

const router = Router();

router.use('/user', UserRoutes);

export default router;
