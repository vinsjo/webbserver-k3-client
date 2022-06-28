import React, { useState, useContext } from 'react';
import SocketContext from '../context/SocketContext';
import styles from './UserForm.module.css';

const UserForm = () => {
	const { setUsername, user } = useContext(SocketContext);
	const [input, setInput] = useState(user?.name || '');
	const handleSubmit = (ev) => {
		ev.preventDefault();
		if (typeof setUsername !== 'function' || !input.length) return;
		setUsername(input);
		setInput('');
	};
	return (
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
