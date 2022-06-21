import React, { useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = React.createContext({
	socket: null,
	messages: [],
	users: [],
});

const SocketProvider = ({ children, url = 'http://localhost:4000' }) => {
	const socket = useMemo(() => io(url), []);
	const [messages, setMessages] = useState([]);
	const [users, setUsers] = useState([]);

	const value = useMemo(
		() => ({ socket, messages, users }),
		[socket, messages, users]
	);

	useEffect(() => {
		if (!socket) return;
		socket.on('connect', () => {
			console.log('Socket connected to server');
			console.log(`Socket ID: ${socket.id}`);
		});
		socket.on('disconnect', () => {
			console.log('Socket disconnected from server');
		});
		socket.on('connect_error', (err) => {
			console.error(err);
		});
		socket.on('message', (msg) =>
			setMessages(Array.isArray(msg) ? msg : [...messages, msg])
		);
		return () => socket.off();
	}, [socket]);

	return (
		<SocketContext.Provider value={value}>
			{children}
		</SocketContext.Provider>
	);
};

export default SocketProvider;
export { SocketContext };
