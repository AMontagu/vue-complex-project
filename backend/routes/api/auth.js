/**
 * Created by adrien on 19/07/17.
 */
const express = require('express');
const router = express.Router();

const authService = require('../../services/auth');

router.post('/login', (req, res) => {
	let username = req.body.username;
	let password = req.body.password;

	if (username === '' || typeof username === 'undefined') {
		return res.status(400).json({
			name: 'AuthenticationFailed',
			message: 'Username should not be empty',
		});
	}

	authService
		.login(username, password)
		.then(userData => {
			req.session.user = username;
			return res.status(200).json({
				username: username,
				token: userData.token,
			});
		})
		.catch(err => {
			return res.status(400).json({
				name: 'AuthenticationFailed',
				message: err.toString(),
			});
		});
});

router.get('/logout', (req, res) => {
	req.session.destroy();
	res.status(200).json({
		name: 'LogOutSuccess',
	});
});

module.exports = router;
