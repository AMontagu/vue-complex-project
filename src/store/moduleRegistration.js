import camelCase from 'lodash/camelCase';

// eslint-disable-next-line
const requireModule = require.context(
	'./modules/', false, /\.js$/
)

const modules = {};

requireModule.keys().forEach(fileName => {
	const moduleRequired = requireModule(fileName);

	const moduleName = camelCase(fileName.replace(/(\.\/|\.js)/g, ''));

	modules[moduleName] = {
		namespaced: true,
		...(moduleRequired.default || moduleRequired),
	};
});

export default modules;
