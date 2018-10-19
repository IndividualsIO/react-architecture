'use strict';

const path = require('path');

module.exports = {
	description: 'Add api',
	prompts: [
		{
			type: 'input',
			name: 'name',
			message: 'What should it be called?(singular)',
			validate: value => {
				if (/.+/.test(value)) {
					return true;
				}
				return 'name is required';
			}
		},
		{
			type: 'confirm',
			name: 'addToActionTypes',
			default: true,
			message: 'Do you want to add this basic crud to the actionTypes list?'
		},
		{
			type: 'confirm',
			name: 'wantAction',
			default: true,
			message: 'Do you want to add a action file?'
		},
		{
			type: 'confirm',
			name: 'wantReducer',
			default: true,
			message: 'Do you want to add a reducer?'
		},
		{
			type: 'confirm',
			name: 'wantInitialState',
			default: true,
			message: 'Do you want to add a initial state to your reducer?'
		}
	],
	actions: data => {
		let actions = [];
		const apiTemplate = path.resolve(__dirname, 'api.js.hbs');

		actions.push({
			type: 'add',
			// path: path.resolve(
			// 	process.cwd(),
			// 	'src/api/{{camelCase name}}Api.js'
			// ),
			path: 'src/api/{{camelCase name}}Api.js',
			templateFile: apiTemplate,
			abortOnFail: true
		});
		if (data.addToActionTypes) {
			const actionTypeTemplate = path.resolve(__dirname, 'addActionTypes.hbs');
			actions.push({
				type: 'modify',
				// path: path.resolve(
				// 	process.cwd(),
				// 	'src/actions/{{camelCase name}}Actions.js'
				// ),
				path: 'src/actions/actionTypes.js',
				pattern: /(\/\/-- APPEND ITEMS HERE --)/gi,
				templateFile: actionTypeTemplate
			});
		}
		if (data.wantAction) {
			const actionTemplate = path.resolve(__dirname, 'actionCrud.js.hbs');
			actions.push({
				type: 'add',
				// path: path.resolve(
				// 	process.cwd(),
				// 	'src/actions/{{camelCase name}}Actions.js'
				// ),
				path: 'src/actions/{{camelCase name}}Actions.js',
				templateFile: actionTemplate,
				abortOnFail: true
			});
		}
		if (data.wantReducer) {
			const reducerTemplate = path.resolve(__dirname, 'reducerCrud.js.hbs');

			actions.push({
				type: 'add',
				// path: path.resolve(
				// 	process.cwd(),
				// 	'src/reducers/{{camelCase name}}Reducer.js'
				// ),
				path: 'src/reducers/{{camelCase name}}Reducer.js',
				templateFile: reducerTemplate,
				abortOnFail: true
			});
		}

		if (data.wantInitialState) {
			const initialStateTemplate = path.resolve(__dirname, 'reducerInitialState.js.hbs');

			actions.push({
				type: 'modify',
				// path: path.resolve(
				// 	process.cwd(),
				// 	'src/reducers/InitialState.js'
				// ),
				path: 'src/reducers/InitialState.js',
				pattern: /(\/\/-- APPEND ITEMS HERE --)/gi,
				templateFile: initialStateTemplate,
				abortOnFail: true
			});
		}

		return actions;
	}
};
