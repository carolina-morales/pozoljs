import { Router } from 'express';

import UserController from './user.controller';

const { getUsers } = UserController;

const router = Router();

router.post('/users', getUsers);

export default router;
