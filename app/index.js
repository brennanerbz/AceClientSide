import 'babel-core/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
require('bootstrap');
// import createBrowserHistory from 'history/lib/createBrowserHistory';
import Root from './Root';

ReactDOM.render(
	<Root />,
	document.getElementById('app')
);

/* Child: ./Root.js */