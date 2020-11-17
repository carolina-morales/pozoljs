const { Router } = require('express');

const UserController = require('./user.controller');

const router = Router();

router.get('/', UserController.getUsers);
router.post('/', UserController.saveUsers);
router.put('/:id', UserController.updateUsers);
router.delete('/:id', UserController.deleteUsers);

module.exports = router;
