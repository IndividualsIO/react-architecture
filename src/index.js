import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

import configureStore from './store/configure';
import App from './containers/app';

import './styles/styles.css';

const store = configureStore();

const render = Component => {
	ReactDOM.hydrate(
		<AppContainer warnings={false}>
			<Provider store={store}>
				<Component />
			</Provider>
		</AppContainer>,
		document.getElementById('app')
	);
};

render(App);

// Webpack Hot Module Replacement API
if (module.hot) {
	module.hot.accept('./containers/app', () => {
		render(App);
	});
}
