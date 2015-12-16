import { combineReducers } from 'redux';
import { createset } from './createset';
import sets from './usersets';
import setView from './set';
import learn from './learnv2';
import profile from './profile';
import user from './user';
import search from './search';
import transfer from './transfer';
import upload from './import'; // Need better naming convention for this view
import error_page from './error';
import { routerStateReducer } from 'redux-router';

const reducers = combineReducers({
	sets,
	setView,
	learn,	
	createset,
	profile,
	user,
	search,
	transfer,
	upload,
	error_page,
	router: routerStateReducer
});

export default reducers;
