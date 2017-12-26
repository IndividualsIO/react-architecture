import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/common/headerPage';
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
	children: PropTypes.element,
	isFetching: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
	isFetching: state.ajax.inProgress > 0
});

export default connect(mapStateToProps)(App);
