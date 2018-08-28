const componentGenerator = require('./component/index.js');
const containerGenerator = require('./container/index.js');
const actionGenerator = require('./action/index.js');
const reducerGenerator = require('./reducer/index.js');
const apiGenerator = require('./api/index.js');

module.exports = plop => {
	plop.addHelper('upperCase', text => text.toUpperCase());
	plop.setGenerator('component', componentGenerator);
	plop.setGenerator('container', containerGenerator);
	plop.setGenerator('action', actionGenerator);
	plop.setGenerator('reducer', reducerGenerator);
	plop.setGenerator('api', apiGenerator);
};
