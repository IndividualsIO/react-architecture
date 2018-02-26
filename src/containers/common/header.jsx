import React from 'react';
import PropTypes from 'prop-types';

import Loader from '../../components/common/loader';

const spinner = {
	color: '#000',
	size: 30,
	verticalAlign: 'center',
	className: 'loading'
};

const HeaderPage = props => (
	<div>
		<Loader id="spinner" {...spinner} loading={props.isFetching} />
	</div>
);

HeaderPage.propTypes = {
	isFetching: PropTypes.bool.isRequired
};

export default HeaderPage;
