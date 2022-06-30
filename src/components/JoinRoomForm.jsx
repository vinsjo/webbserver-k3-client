import React, { useState, useContext } from 'react';
import SocketContext from '../context/SocketContext';
import { useNavigate } from 'react-router-dom';
import styles from './JoinRoomForm.module.css';

const JoinRoomForm = () => {
	const { rooms } = useContext(SocketContext);
	const [selectedID, setSelectedID] = useState(null);
	const navigate = useNavigate();
	const handleSubmit = (ev) => {
		ev.preventDefault();
		if (!selectedID) return;
		navigate(`/chat/${selectedID}`);
	};
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
							onClick={() => setSelectedID(id)}
						>
							{name}
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
