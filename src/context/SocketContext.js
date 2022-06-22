import React from 'react';

const SocketContext = React.createContext({
	socket: null,
	user: null,
	messages: [],
	users: [],
	sendMessage: null,
});

export default SocketContext;
