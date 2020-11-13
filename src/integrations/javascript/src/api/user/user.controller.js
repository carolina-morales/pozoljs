const _userService = require('./user.service');

const UserController = {};

UserController.getUsers = async (req, res) => {
	try {
		const users = await _userService.find();
		return res.json(users);
	} catch (error) {
		console.error('Error in UserController.getUsers', error);
		return res.status(500).send(error);
	}
};

module.exports = UserController;
