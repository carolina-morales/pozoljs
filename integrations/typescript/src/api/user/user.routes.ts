import { Router } from 'express';

import UserController from './user.controller';

const userCtrl = UserController;

const router = Router();

router.post('/users', userCtrl.getUsers);

export default router;
