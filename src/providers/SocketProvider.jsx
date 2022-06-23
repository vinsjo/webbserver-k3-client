import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { io } from 'socket.io-client';
import SocketContext from '../context/SocketContext';
import { replaceAtIndex } from '../utils';

const SocketProvider = ({ children, url = 'http://localhost:4000' }) => {
	const [socket, setSocket] = useState(null);
	const [error, setError] = useState(null);
	const [user, setUser] = useState(null);
	const [messages, setMessages] = useState([]);
	const [users, setUsers] = useState([]);

	const reset = () => {
		setMessages([]);
		setUsers([]);
		setError(null);
	};

	const sendMessage = (content) => {
		if (!socket) return;
		socket.emit('message', { content, user });
	};

	useEffect(() => {
		const socket = io(url);
		socket.io.reconnectionDelay = 10000;
		setSocket(socket);
		return () => socket.disconnect();
	}, []);

	useEffect(() => {
		if (!socket) return;
		socket
			.on('connect', () => {
				console.log('Socket connected to server', `ID: ${socket.id}`);
				reset();
				setSocket(socket);
			})
			.on('disconnect', () => {
				console.log('Socket disconnected from server');
				reset();
				setSocket(socket);
			})
			.on('connect_error', (err) => {
				err.message !== 'xhr poll error' && console.error(err);
				setSocket(socket);
				setError(err);
			})
			.on('message', (msg) => {
				if (!msg || !msg.id) return;
				console.log('Recieved message: ', msg);
				const index = messages.findIndex(({ id }) => msg.id === id);
				setMessages(
					index < 0
						? [...messages, msg]
						: replaceAtIndex(messages, index, msg)
				);
			});
		return () => socket.off();
	}, [socket, error, messages, users]);

	return (
		<SocketContext.Provider
			value={{ socket, error, messages, sendMessage, users, user }}
		>
			{children}
		</SocketContext.Provider>
	);
};

export default SocketProvider;
