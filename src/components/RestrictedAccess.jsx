import React from 'react';
import { Navigate } from 'react-router-dom';

const RestrictedAccess = ({
	children,
	accessGranted = null,
	fallbackRoute = '/',
	replace = true,
}) => {
	return accessGranted === null ? (
		''
	) : accessGranted === true ? (
		<>{children}</>
	) : (
		<Navigate replace={replace} to={fallbackRoute} />
	);
};

export default RestrictedAccess;
