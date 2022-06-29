import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserForm from '../components/UserForm';
import SocketContext from '../context/SocketContext';
const Start = () => {
	const { user, currentRoom, socket } = useContext(SocketContext);
	const navigate = useNavigate();
	useEffect(() => {
		if (!user || !currentRoom || !socket?.connected) return;
		navigate('/chat', { replace: true });
	}, [user, currentRoom, socket]);
	return <UserForm />;
};

export default Start;
