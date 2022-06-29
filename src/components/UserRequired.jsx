import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import SocketContext from '../context/SocketContext';

const UserRequired = ({ children, fallbackRoute = '/' }) => {
	const { user, socket } = useContext(SocketContext);
	return !socket || !socket.connected || !user ? (
		<Navigate replace to={fallbackRoute} />
	) : (
		<>{children}</>
	);
};

export default UserRequired;
