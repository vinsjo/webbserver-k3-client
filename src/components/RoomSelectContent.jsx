import React from 'react';
import styles from './RoomSelectContent.module.css';
import JoinRoomForm from './JoinRoomForm';
import AddRoomForm from './AddRoomForm';

const RoomSelectContent = () => {
	return (
		<div className={styles.container}>
			<AddRoomForm />
			<JoinRoomForm />
		</div>
	);
};

export default RoomSelectContent;
