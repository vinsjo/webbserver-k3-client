import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SocketContext from '../context/SocketContext';
import PageTitle from '../components/PageTitle';
import JoinRoomForm from '../components/JoinRoomForm';
import RoomSelectContent from '../components/RoomSelectContent';

const RoomSelection = () => {
	const { user } = useContext(SocketContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			navigate('/', { replace: true });
			return;
		}
	}, [user]);
	return (
		<>
			<PageTitle title="Select Chat Room" />
			<RoomSelectContent />
		</>
	);
};

export default RoomSelection;
