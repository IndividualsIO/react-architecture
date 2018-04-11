const componentGenerator = require('./component/index.js');
const containerGenerator = require('./container/index.js');
const actionGenerator = require('./action/index.js');
const reducerGenerator = require('./reducer/index.js');

module.exports = plop => {
	plop.setGenerator('component', componentGenerator);
	plop.setGenerator('container', containerGenerator);
	plop.setGenerator('action', actionGenerator);
	plop.setGenerator('reducer', reducerGenerator);
};
