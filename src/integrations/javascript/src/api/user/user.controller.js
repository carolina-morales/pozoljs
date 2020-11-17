const _userService = require('./user.service');

const UserController = {};

UserController.getUsers = async (req, res) => {
	try {
		const users = await _userService.find(req.query);
		return res.json(users);
	} catch (error) {
		console.error('Error in UserController.getUsers', error);
		return res.status(500).send(error);
	}
};

UserController.saveUsers = async (req, res) => {
	try {
		const saved = await _userService.save(req.body);
		return res.send(saved);
	} catch (error) {
		console.error('Error in UserController.saveUsers', error);
		return res.status(500).send(error);
	}
};

UserController.updateUsers = async (req, res) => {
	const { id } = req.params;

	try {
		const updated = await _userService.update(parseInt(id), req.body);
		return res.send(updated);
	} catch (error) {
		console.error('Error in UserController.updateUsers', error);
		return res.status(500).send(error);
	}
};

UserController.deleteUsers = async (req, res) => {
	const { id } = req.params;

	try {
		const deleted = await _userService.delete(parseInt(id));
		return res.send(deleted);
	} catch (error) {
		console.error('Error in UserController.deleteUsers', error);
		return res.status(500).send(error);
	}
};

module.exports = UserController;
