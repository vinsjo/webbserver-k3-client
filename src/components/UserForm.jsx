import React, { useState, useContext } from 'react';
import SocketContext from '../context/SocketContext';
import useLocalStorage from '../hooks/useLocalStorage';
import styles from './UserForm.module.css';

const UserForm = () => {
	const { setUsername, socket } = useContext(SocketContext);
	const [input, setInput] = useLocalStorage('vs-socket-chat-username', '');
	const handleSubmit = (ev) => {
		ev.preventDefault();
		if (typeof setUsername !== 'function' || !input.length) return;
		setUsername(input);
		setInput('');
	};
	return !socket?.connected ? null : (
		<div>
			<h3>Enter username:</h3>
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
		</div>
	);
};

export default UserForm;
