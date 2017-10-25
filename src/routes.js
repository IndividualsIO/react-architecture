import React from 'react';
import { Route } from 'react-router-dom';

export default (
	<div>
		<Route exact path="/" />
		<Route path="/test" component={null} />
	</div>
);
