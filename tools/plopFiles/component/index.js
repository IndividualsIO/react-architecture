'use strict';

const path = require('path');

module.exports = {
	description: 'Add component',
	prompts: [
		{
			type: 'list',
			name: 'type',
			message: 'Select the type of component',
			default: 'Stateless',
			choices: () => ['Stateless', 'Component']
		},
		{
			type: 'input',
			name: 'name',
			message: 'What should it be called?',
			validate: value => {
				if (/.+/.test(value)) {
					return true;
				}
				return 'name is required';
			}
		},
		{
			type: 'confirm',
			name: 'connectedComponent',
			default: true,
			message: 'Do you want a connected component?'
		},
		{
			type: 'input',
			name: 'relativePath',
			message: 'Folder'
		}
	],
	actions: data => {
		// Generate index.js and index.test.js
		let componentTemplate;

		switch (data.type) {
			case 'Stateless': {
				componentTemplate = path.resolve(__dirname, 'stateless.js.hbs');
				break;
			}
			case 'Component': {
				componentTemplate = path.resolve(__dirname, 'component.js.hbs');
				break;
			}
			default: {
				componentTemplate = path.resolve(__dirname, 'stateless.js.hbs');
			}
		}

		let relativePath;

		if (data.relativePath) {
			relativePath =
				'src/components/' + data.relativePath + '/{{properCase name}}.jsx';
		} else {
			relativePath = 'src/components/{{properCase name}}.jsx';
		}

		const actions = [
			{
				type: 'add',
				path: path.resolve(process.cwd(), relativePath),
				templateFile: componentTemplate,
				abortOnFail: true
			}
		];

		return actions;
	}
};
