import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

import history from './store/history';
import configureStore from './store/configure';
import App from './containers/app';

const store = configureStore();

const render = Component => {
	ReactDOM.render(
		<AppContainer>
			<Provider store={store}>
				<Router history={history}>
					<Component />
				</Router>
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
