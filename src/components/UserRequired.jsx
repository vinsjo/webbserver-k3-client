import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import SocketContext from '../context/SocketContext';

const UserRequired = ({ children, fallbackRoute = '/' }) => {
	const { user } = useContext(SocketContext);
	return !user ? <Navigate replace to={fallbackRoute} /> : <>{children}</>;
};

export default UserRequired;
