import { Router } from 'express';

import TestController from './test.controller';

const testCtrl = new TestController();
const router = Router();

router.get('/', testCtrl.getTests);

export default router;
