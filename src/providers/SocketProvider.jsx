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
		setCurrentRoom(null);
	};

	const sendMessage = (text) => {
		if (!socket || !user || !currentRoom) return;
		socket.emit('message', {
			text,
			user_id: user.id,
			room_id: currentRoom.id,
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
				if (user && user.name) {
					setUsername(user.name);
				}
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
			})
			.on('messages', (messages) => {
				console.log('messages: ', messages);
				setMessages(messages);
			})
			.on('users', (users) => {
				console.log('users: ', users);
				setUsers(users);
			})
			.on('user', (user) => {
				console.log('user: ', user);
				setUser(user);
				if (currentRoom) return;
				socket.emit('join_room', { user_id: user.id });
			})
			.on('updated_user', (user) => {
				console.log('updated_user: ', user);
				setUser(user);
			})
			.on('join_room', (room) => {
				console.log('room: ', room);
				setCurrentRoom(room);
				socket.emit('get_messages', room.id);
				socket.emit('get_users', room.id);
			})
			.on('error', (err) => {
				console.error(err);
				setError(err);
			})
			.on('message', (msg) => {
				if (!msg || !msg.id) return;
				console.log('Recieved message: ', msg);
				setMessages([...messages, msg]);
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
