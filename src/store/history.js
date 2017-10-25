import createHistory from 'history/createBrowserHistory';

const history = createHistory({
	hashType: 'slash'
});

export default history;
