import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import createHistory from 'history/createBrowserHistory';

import App from './components/app';

const history = createHistory();

const render = Component => {
	ReactDOM.render(
		<AppContainer>
			<Router history={history}>
				<Component />
			</Router>
		</AppContainer>,
		document.getElementById('app')
	);
};

render(App);

// Webpack Hot Module Replacement API
if (module.hot) {
	module.hot.accept('./components/app', () => {
		render(App);
	});
}
