import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import Header from './common/header';
import routes from '../routes';

class App extends React.Component {
	componentDidCatch() {
		//DO SOMETHING ( error ) = PARAM
	}

	render() {
		return (
			<div>
				{Header({
					isFetching: this.props.isFetching
				})}
				{routes}
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
