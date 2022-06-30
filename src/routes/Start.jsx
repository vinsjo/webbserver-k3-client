import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserForm from '../components/UserForm';
import SocketContext from '../context/SocketContext';
import PageTitle from '../components/PageTitle';
const Start = () => {
	const { user, socket } = useContext(SocketContext);
	const navigate = useNavigate();
	useEffect(() => {
		if (!user || !socket?.connected) return;
		navigate('/chat', { replace: true });
	}, [user, socket]);
	return (
		<>
			<PageTitle title="Enter Username" />
			<UserForm />
		</>
	);
};

export default Start;
