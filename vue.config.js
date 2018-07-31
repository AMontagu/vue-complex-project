const indexServer = require('./backend/server');

module.exports = {
	devServer: {
		host: '0.0.0.0',
		port: 8080,
		https: false,
		//proxy: 'http://localhost:3000',
		before: app => {

			//usefull if static file are server with server like apache or nginx
			/*app.use(
				'/static',
				serveStatic(path.join(helpers.baseDir, '/public'), {
					maxAge: 0
				})
			);*/

			app.use(indexServer);
		}
	}
};