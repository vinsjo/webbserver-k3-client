import React, { useContext, useState } from 'react';
import SocketContext from '../context/SocketContext';
import { isFn } from 'x-is-type';
import styles from './AddRoomForm.module.css';

const AddRoomForm = () => {
	const [input, setInput] = useState('');
	const { addRoom } = useContext(SocketContext);
	const handleSubmit = (ev) => {
		ev.preventDefault();
		if (!input.trim().length) return setInput('');
		if (!isFn(addRoom)) return;
		addRoom(input);
	};
	return (
		<div className={styles.container}>
			<h4 className={styles.title}>Add Room</h4>
			<form className={styles.form} onSubmit={handleSubmit}>
				<input
					className={styles.input}
					type="text"
					value={input}
					placeholder="Enter room name..."
					maxLength={50}
					onChange={(ev) => setInput(ev.target.value)}
					required
				/>
				<button
					className={styles.button}
					disabled={!input.trim().length}
				>
					Submit
				</button>
			</form>
		</div>
	);
};

export default AddRoomForm;
