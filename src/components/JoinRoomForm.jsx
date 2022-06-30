import React, { useState, useContext, useEffect } from 'react';
import SocketContext from '../context/SocketContext';
import { useNavigate } from 'react-router-dom';
import styles from './JoinRoomForm.module.css';

const JoinRoomForm = () => {
	const { rooms, deleteRoom } = useContext(SocketContext);
	const [selectedID, setSelectedID] = useState(null);
	const navigate = useNavigate();

	const handleSubmit = (ev) => {
		ev.preventDefault();
		if (!selectedID) return;
		navigate(`/chat/${selectedID}`);
	};

	useEffect(() => {
		if (!selectedID) return;
		const selectedRoom = rooms.find((room) => room.id === selectedID);
		if (!selectedRoom) setSelectedID(null);
	}, [selectedID, rooms]);
	return (
		<form onSubmit={handleSubmit} className={styles.form}>
			<ul className={styles['room-list']}>
				{rooms.map(({ id, name }) => {
					const checked = selectedID === id;
					return (
						<li
							key={id}
							className={`${styles.room}${
								checked ? ` ${styles.selected}` : ''
							}`}
						>
							<code
								className={styles['room-name']}
								onClick={() => setSelectedID(id)}
							>
								{name}
							</code>
							<button
								className={styles['delete-button']}
								type="button"
								onClick={() => deleteRoom(id)}
							>
								X
							</button>
						</li>
					);
				})}
			</ul>
			<button className={styles.button} disabled={!selectedID}>
				join room
			</button>
		</form>
	);
};

export default JoinRoomForm;
