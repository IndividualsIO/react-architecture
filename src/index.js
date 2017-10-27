import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

import routes from './routes';
import history from './store/history';
import configureStore from './store/configure';
import App from './containers/app';

const store = configureStore();

const render = Component => {
	ReactDOM.render(
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<div>
					<AppContainer warnings={false}>
						<Component />
					</AppContainer>
					{routes}
				</div>
			</ConnectedRouter>
		</Provider>,
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
