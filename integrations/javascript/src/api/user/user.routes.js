const { Router } = require('express');

const { getUsers } = require('./user.controller');

const router = Router();

router.get('/users', getUsers);

module.exports = router;
