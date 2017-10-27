import createHistory from 'history/createBrowserHistory';

const history = createHistory();

/* eslint-disable no-console */
history.listen((location, action) => {
	console.log(
		`The current URL is ${location.pathname}${location.search}${location.hash}`
	);
	console.log(`The last navigation action was ${action}`);
});

export default history;
