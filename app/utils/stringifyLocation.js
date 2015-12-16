import { stringifyQuery } from 'react-router/lib/QueryUtils';

export default function stringifyLocation(location) {
	const query = stringifyQuery(location.query);

	return `${location.pathname}${query && `?${query}`}`;
}