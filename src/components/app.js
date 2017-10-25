import React from 'react';
import PropTypes from 'prop-types';

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
	children: PropTypes.element
};

export default App;
