import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import routes from '../routes';

class App extends React.Component {
	render() {
		return (
			<div className="container-fluid">
				<p>Header</p>
				{routes}
				{this.props.children}
			</div>
		);
	}
}

// Validation
App.propTypes = {
	children: PropTypes.element,
	isFetching: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
	isFetching: state.ajaxCallsInProgress > 0
});

export default connect(mapStateToProps)(App);
