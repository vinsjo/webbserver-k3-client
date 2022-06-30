import React, { useState, useContext } from 'react';
import { isFn } from 'x-is-type';
import SocketContext from '../context/SocketContext';
import useLocalStorage from '../hooks/useLocalStorage';
import styles from './UserForm.module.css';

const UserForm = () => {
	const { setUsername, socket } = useContext(SocketContext);
	const [storedName, setStoredName] = useLocalStorage(
		'vs-socket-chat-username',
		''
	);
	const [input, setInput] = useState(() => storedName || '');

	const handleSubmit = (ev) => {
		ev.preventDefault();
		if (!input.trim().length) return setInput('');
		if (!isFn(setUsername)) return;
		setUsername(input);
		setStoredName(input);
	};
	return !socket?.connected ? null : (
		<form className={styles.form} onSubmit={handleSubmit}>
			<input
				className={styles.input}
				type="text"
				value={input}
				placeholder="Enter your username..."
				maxLength={30}
				onChange={(ev) => setInput(ev.target.value)}
				required
			/>
			<button className={styles.button} disabled={!input.length}>
				Submit
			</button>
		</form>
	);
};

export default UserForm;
