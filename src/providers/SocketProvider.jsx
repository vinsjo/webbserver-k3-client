import React, { useEffect, useState, useCallback } from 'react';
import { io } from 'socket.io-client';
import SocketContext from '../context/SocketContext';

const SocketProvider = ({ children, url = 'http://localhost:4000' }) => {
	const [username, setUsername] = useState('');
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

	const sendMessage = useCallback(
		(text) => {
			if (!socket || !user || !currentRoom) return;
			socket.emit('message', {
				text,
				user_id: user.id,
				room_id: currentRoom.id,
			});
		},
		[socket, user, currentRoom]
	);

	const joinRoom = useCallback(
		(room_id) => {
			if (!socket || !user) return;
			socket.emit('join_room', { user_id: user.id, room_id });
		},
		[socket, user]
	);

	const addRoom = useCallback(
		(room_name) => {
			if (!socket) return;
			socket.emit('create_room', room_name);
		},
		[socket]
	);

	const deleteRoom = useCallback(
		(room_id) => {
			if (!socket) return;
			socket.emit('delete_room', room_id);
		},
		[socket]
	);

	useEffect(() => {
		if (!socket || !username.length || user?.name === username) return;
		socket.emit('user', username);
	}, [username]);

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
				console.log('Socket connected to server');
				reset();
				setSocket(socket);
				socket.emit('get_rooms');
				if (user && user.name) {
					setUsername(user.name);
				}
				setError(null);
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
				setRooms(rooms);

				if (!currentRoom) return;

				const roomIndex = rooms.findIndex(
					(room) => room.id === currentRoom.id
				);
				if (roomIndex < 0) setCurrentRoom(null);
				setError(null);
			})
			.on('messages', (messages) => {
				setMessages(messages);
				setError(null);
			})
			.on('users', (users) => {
				setUsers(users);
				setError(null);
			})
			.on('user', (user) => {
				setUser(user);
				setError(null);
			})
			.on('join_room', (room) => {
				setCurrentRoom(room);
				socket.emit('get_messages', room.id);
				socket.emit('get_users', room.id);
				setError(null);
			})
			.on('leave_room', () => {
				setCurrentRoom(null);
				setMessages([]);
				setUsers([]);
				setError(null);
			})
			.on('error', (err) => {
				console.error(err);
				setError(err);
			})
			.on('message', (msg) => {
				if (!msg || !msg.id) return;
				setMessages([...messages, msg]);
				setError(null);
			});
		return () => socket.off();
	}, [socket, error, messages, users]);

	return (
		<SocketContext.Provider
			value={{
				socket,
				error,
				user,
				currentRoom,
				rooms,
				messages,
				users,
				sendMessage,
				setUsername,
				addRoom,
				joinRoom,
				deleteRoom,
			}}
		>
			{children}
		</SocketContext.Provider>
	);
};

export default SocketProvider;
