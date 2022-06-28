import React, { useContext } from 'react';
import SocketContext from '../context/SocketContext';
import styles from './Header.module.css';

const Header = () => {
	const { error, socket, user, currentRoom } = useContext(SocketContext);
	return (
		<header className={styles.header}>
			{error ? (
				<code>
					{error.message === 'xhr poll error'
						? 'connection failed, trying to reconnect...'
						: `error: ${error.message}`}
				</code>
			) : !socket || !socket.connected ? (
				<code>Connecting...</code>
			) : user && currentRoom ? (
				<>
					<code>user: {user.name}</code>
					<code>room: {currentRoom.name}</code>
				</>
			) : (
				''
			)}
		</header>
	);
};

export default Header;
