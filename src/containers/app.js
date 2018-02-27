import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import { ConnectedRouter } from 'react-router-redux';

import history from '../store/history';
import Header from './common/header';
import routes from '../routes';

class App extends React.Component {
	componentDidCatch() {
		//DO SOMETHING ( error ) = PARAM
	}

	render() {
		return (
			<div>
				<ConnectedRouter history={history}>
					<div>
						{Header({
							isFetching: this.props.isFetching
						})}
						{routes}
					</div>
				</ConnectedRouter>
			</div>
		);
	}
}

// Validation
App.propTypes = {
	isFetching: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
	isFetching: state.ajax.inProgress > 0
});

export default hot(module)(connect(mapStateToProps)(App));
