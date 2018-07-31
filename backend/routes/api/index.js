const express = require('express');
const authRoute = require('./auth');
const authService = require('../../services/auth');

const router = express.Router();

router.use((req, res, next) => {
	//if login api no security check
	if (req.url === '/auth/login' || req.url === '/auth/logout')
		return next();

	// check header or url parameters or post parameters for token
	let token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization'];

	// decode token
	if (token) {
		authService.checkToken(token).then(userData => {
				helpers.connectedUser = userData;

				return next();
			}).catch(err => {
				return res.status(403).send({
					name: 'WrongToken',
					message: err.toString(),
				});
			});
	} else {
		// if there is no token
		// return an error
		return res.status(403).send({
			name: 'NoTokenProvided',
			message: 'No token provided.',
		});
	}
});

router.get('/', (req, res) => {
	return res.status(200).json({
		message: 'Hello World',
	});
});


router.use('/auth', authRoute);

module.exports = router;
