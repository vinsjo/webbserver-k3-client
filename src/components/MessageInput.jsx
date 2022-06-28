import React, { useContext, useState } from 'react';
import SocketContext from '../context/SocketContext';
import styles from './MessageInput.module.css';

const MessageInput = () => {
	const [input, setInput] = useState('');
	const { user, currentRoom, sendMessage } = useContext(SocketContext);
	const handleSubmit = (ev) => {
		ev.preventDefault();
		if (typeof sendMessage !== 'function' || !input.length) return;
		sendMessage(input);
		setInput('');
	};
	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<input
				className={styles.input}
				type="text"
				value={input}
				disabled={!currentRoom || !user || !socket?.connected}
				onChange={(ev) => setInput(ev.target.value)}
			/>
			<button
				className={styles.button}
				disabled={
					!input.length || !currentRoom || !user || !socket?.connected
				}
			>
				send
			</button>
		</form>
	);
};

export default MessageInput;
