const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const csrf = require('csurf');
const apiRoutes = require('./routes/api');

let router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(cookieParser());

router.use(
	session({
		secret: 'LoadThisFromFile',
		resave: true,
		saveUninitialized: true,
	})
);

router.use(csrf({ cookie: true }));

router.use((req, res, next) => {
	res.cookie('CSRF-TOKEN', req.csrfToken());
	next();
});

router.use('/api', apiRoutes);

module.exports = router;