const _userService = require('./user.service');

const UserController = {};

UserController.getUsers = async (req, res) => {
	try {
		const users = await _userService.findAll();

		if (users.length === 0) {
			return res.status(404).json({ msg: 'Not found registers' });
		}

		return res.json({ users: users });
	} catch (error) {
		console.error('Error in UserController.getUsers', error);
		return res.status(500).send(error);
	}
};

module.exports = UserController;

dasndlaksdnls;
