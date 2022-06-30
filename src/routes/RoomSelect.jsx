import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SocketContext from '../context/SocketContext';
import PageTitle from '../components/PageTitle';

const RoomSelect = () => {
	const [roomId, setRoomId] = useState(null);
	const { user, rooms, addRoom } = useContext(SocketContext);
	const navigate = useNavigate();
	console.log('RoomSelect');
	console.log('user: ', user);
	console.log('rooms: ', rooms);
	useEffect(() => {
		if (!user) {
			navigate('/', { replace: true });
			return;
		}
		if (!roomId) return;
		navigate(`/chat/${roomId}`);
	}, [user, roomId]);
	return (
		<>
			<PageTitle title="Select Chat Room" />
			<h3>Select Room</h3>
			<ul>
				{rooms.map(({ id, name }) => {
					return (
						<li
							key={id}
							onClick={() => setRoomId(id)}
							style={{
								cursor: 'pointer',
								backgroundColor:
									id === roomId ? 'green' : 'none',
							}}
						>
							{name}
						</li>
					);
				})}
			</ul>
		</>
	);
};

export default RoomSelect;
