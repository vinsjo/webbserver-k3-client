import React, { useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RestrictedAccess from '../components/RestrictedAccess';
import ChatContainer from '../components/ChatContainer';
import SocketContext from '../context/SocketContext';
import PageTitle from '../components/PageTitle';

const Chat = () => {
	const { room_id } = useParams();
	const { user, currentRoom, joinRoom } = useContext(SocketContext);
	const navigate = useNavigate();

	console.log('room_id: ', room_id);

	useEffect(() => {
		if (!user) {
			navigate('/', { replace: true });
		}
		if (!room_id) {
			navigate('/chat', { replace: true });
			return;
		}
		if (currentRoom?.id === room_id) return;
		joinRoom(room_id);
	}, [user, room_id]);

	return (
		<>
			{!user || !currentRoom ? (
				''
			) : (
				<>
					<PageTitle
						title={`Chat${
							currentRoom ? ` - ${currentRoom.name}` : ''
						}`}
					/>
					<ChatContainer />
				</>
			)}
		</>
	);
};

export default Chat;
