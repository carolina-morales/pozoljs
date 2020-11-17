import { Router } from 'express';

import UserController from './user.controller';

const userCtrl = new UserController();

const router = Router();

router.get('/', userCtrl.getUsers);
router.post('/', userCtrl.saveUsers);
router.put('/:id', userCtrl.updateUsers);
router.delete('/:id', userCtrl.deleteUsers);

export default router;
