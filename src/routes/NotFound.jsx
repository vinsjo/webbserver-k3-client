import React from 'react';
import { useLocation } from 'react-router-dom';

const NotFound = () => {
	const { pathname } = useLocation();
	return (
		<>
			<PageTitle title="Page Not Found" />
			<h3>Page '{pathname}'' does not exist.</h3>
		</>
	);
};

export default NotFound;
