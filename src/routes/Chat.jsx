import React, { useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ChatContent from '../components/ChatContent';
import SocketContext from '../context/SocketContext';
import PageTitle from '../components/PageTitle';

const Chat = () => {
	const { room_id } = useParams();
	const { user, currentRoom, joinRoom } = useContext(SocketContext);
	const navigate = useNavigate();

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
	}, [user, room_id, currentRoom]);

	return (
		<>
			{!user || !currentRoom ? null : (
				<>
					<PageTitle
						title={`Chat${
							currentRoom ? ` - ${currentRoom.name}` : ''
						}`}
					/>
					<ChatContent />
				</>
			)}
		</>
	);
};

export default Chat;
