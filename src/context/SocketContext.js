import React from 'react';

/**
 * @typedef {{id: String, name: String, socket_id: String, room_id: String, role: String online: Boolean}} ChatUser
 * @typedef {{id: String, name: String}} ChatRoom
 * @typedef {{id: String, text: String, user_id: String, room_id: String, timestamp: Number, user: User}} ChatMessage
 */

const initialState = {
	/** @type {(null | import("socket.io-client").Socket)} */
	socket: null,
	/** @type {(null | object)} */
	error: null,
	/** @type {(null | ChatUser)} */
	user: null,
	/** @type {(null | ChatRoom)} */
	currentRoom: null,
	/** @type {ChatRoom[]}*/
	rooms: [],
	/** @type {ChatMessage[]} */
	messages: [],
	/** @type {ChatUser[]} */
	users: [],
	/** @param {String} text */
	sendMessage: (text) => {},
	/** @param {String} username */
	setUsername: (username) => {},
	/** @param {String} room_name */
	addRoom: (room_name) => {},
	/** @param {String} room_id */
	joinRoom: (room_id) => {},
};

/**
 * @property {}
 */
const SocketContext = React.createContext(initialState);

export default SocketContext;
