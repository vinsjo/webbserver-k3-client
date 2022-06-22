import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { io } from 'socket.io-client';
import SocketContext from '../context/SocketContext';
import { replaceAtIndex } from '../utils';

const SocketProvider = ({ children, url = 'http://localhost:4000' }) => {
	const [socket, setSocket] = useState(null);
	const [error, setError] = useState(null);
	const [messages, setMessages] = useState([]);
	const [users, setUsers] = useState([]);

	const value = useMemo(
		() => ({ socket, error, messages, users }),
		[socket, error, messages, users]
	);

	useEffect(() => {
		const socket = io(url);
		setSocket(socket);
		return () => socket.disconnect();
	}, []);

	useEffect(() => {
		if (!socket) return;
		const listeners = {
			connect: () => {
				console.log('Socket connected to server', `ID: ${socket.id}`);
				if (error) setError(null);
				setSocket(socket);
			},
			disconnect: () => {
				console.log('Socket disconnected from server');
				setSocket(socket);
			},
			connect_error: (err) => {
				console.error(err);
				setError(err);
			},
			message: (msg) => {
				if (!msg || !msg.id) return;
				console.log('Recieved message: ', msg);
				const index = messages.findIndex(({ id }) => msg.id === id);
				setMessages(
					index < 0
						? [...messages, msg]
						: replaceAtIndex(messages, index, msg)
				);
			},
		};
		Object.keys(listeners).forEach((ev) => socket.on(ev, listeners[ev]));
		return () => {
			Object.keys(listeners).forEach((ev) =>
				socket.off(ev, listeners[ev])
			);
		};
	}, [socket, error, messages, users]);

	return (
		<SocketContext.Provider value={value}>
			{children}
		</SocketContext.Provider>
	);
};

export default SocketProvider;
