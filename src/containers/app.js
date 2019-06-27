import React from 'react';
import { useSelector } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import Header from './common/header';
import routes from '../routes';

const App = () => {
	const isFetching = useSelector(state => state.ajax.inProgress > 0);

	return (
		<div>
			{Header({ isFetching })}
			{routes}
		</div>
	);
};

export default hot(App);
