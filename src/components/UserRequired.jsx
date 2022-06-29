import React, { useContext, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import SocketContext from '../context/SocketContext';

const UserRequired = ({ children, fallbackRoute = '/' }) => {
	const { user, currentRoom } = useContext(SocketContext);
	const [accessGranted, setAccessGranted] = useState(null);
	useEffect(() => {
		setAccessGranted(!!user && !!currentRoom);
	}, [user, currentRoom]);

	return accessGranted === null ? (
		''
	) : accessGranted === true ? (
		<>{children}</>
	) : (
		<Navigate replace to={fallbackRoute} />
	);
};

export default UserRequired;
