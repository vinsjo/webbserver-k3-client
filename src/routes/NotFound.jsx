import React from 'react';
import { useLocation } from 'react-router-dom';

const NotFound = () => {
	const { pathname } = useLocation();
	return <h3>Page '{pathname}'' does not exist.</h3>;
};

export default NotFound;
