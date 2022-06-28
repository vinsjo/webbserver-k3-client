import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { io } from 'socket.io-client';
import SocketContext from '../context/SocketContext';
import { replaceAtIndex } from '../utils';

const SocketProvider = ({ children, url = 'http://localhost:4000' }) => {
	const [socket, setSocket] = useState(null);
	const [error, setError] = useState(null);
	const [user, setUser] = useState(null);
	const [rooms, setRooms] = useState([]);
	const [messages, setMessages] = useState([]);
	const [users, setUsers] = useState([]);
	const [currentRoom, setCurrentRoom] = useState(null);

	const reset = () => {
		setMessages([]);
		setUsers([]);
		setRooms([]);
		setError(null);
		setUser(null);
		setCurrentRoom(null);
	};

	const sendMessage = (text) => {
		if (!socket) return;

		socket.emit('message', {
			text,
			user_id: user?.id,
			room_id: currentRoom?.id,
		});
	};

	const setUsername = (name) => {
		if (!socket) return;
		socket.emit('user', name);
	};

	const joinRoom = (name) => {
		if (!socket) return;
		socket.emit('join_room', name);
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
				socket.emit('get_rooms');
				socket.emit('get_users');
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
			.on('rooms', (rooms) => {
				console.log('rooms: ', rooms);
				setRooms(rooms);
				joinRoom(
					Array.isArray(rooms) && rooms[0] ? rooms[0].name : 'default'
				);
			})
			.on('users', (users) => {
				console.log('users: ', users);
				setUsers(users);
			})
			.on('user', (user) => {
				console.log('user: ', user);
				setUser(user);
			})
			.on('join_room', (data) => {
				const { room, messages, users } = data;
				console.log('join_room: ', data);
				setCurrentRoom(room);
				setMessages(messages || []);
				setUsers(users || []);
			})
			.on('error', (err) => {
				console.error(err);
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
			value={{
				socket,
				error,
				sendMessage,
				setUsername,
				user,
				currentRoom,
				rooms,
				messages,
				users,
			}}
		>
			{children}
		</SocketContext.Provider>
	);
};

export default SocketProvider;
