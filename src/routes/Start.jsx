import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserForm from '../components/UserForm';
import SocketContext from '../context/SocketContext';
const Start = () => {
	const { user, setUsername } = useContext(SocketContext);
	const navigate = useNavigate();
	useEffect(() => {
		if (!user) return;
		navigate('/chat', { replace: true });
	}, [user]);
	return <UserForm />;
};

export default Start;
